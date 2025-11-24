import { Locator, Page } from '@playwright/test';

/* 
The module contains a method that waits for events,
often used in forms where we wait for various events 
to load underneath.
*/

export async function waitForStableElement(
  page: Page,
  locator: Locator,
  timeout: number = 5000
): Promise<void> {
  const elementHandle = await locator.evaluateHandle((el) => el as HTMLElement);

  await page.evaluate(
    async ({ el, timeoutMs }) => {
      if (!el) throw new Error('Element not found');

      return new Promise<void>((resolve, reject) => {
        let lastMutation = Date.now();

        const observer = new MutationObserver(() => {
          lastMutation = Date.now();
        });

        observer.observe(el, {
          attributes: true,
          childList: true,
          subtree: true
        });

        const checkStable = (): void => {
          const now = Date.now();
          if (now - lastMutation >= 300) {
            observer.disconnect();
            resolve();
          } else if (now - startTime > timeoutMs) {
            observer.disconnect();
            reject(new Error('Element did not stabilize in time'));
          } else {
            setTimeout(checkStable, 100);
          }
        };

        const startTime = Date.now();
        checkStable();
      });
    },
    { el: elementHandle, timeoutMs: timeout }
  );
}
