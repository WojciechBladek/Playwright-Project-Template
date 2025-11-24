import Logger from '@_logger/Logger';
import { waitUntilElementIsVisible } from '@_source/UI/helpers/wait-for-element.helper';
import { Locator } from '@playwright/test';

export async function safeFill(
  locator: Locator,
  text: string | number
): Promise<void> {
  try {
    if (await waitUntilElementIsVisible(locator)) {
      await locator.pressSequentially(`${text}`, { delay: 30 });
    } else {
      Logger.warn(`⚠️ Field ${locator} is not visible on the webform`);
    }
  } catch (error) {
    Logger.error(
      `❌ Error during fill field ${locator}, filled text "${text}" error:`,
      error
    );
  }
}

/**
 * Use this method if you want to hide sensitive data in reports.
 * Instead of display sensitive data will be displayed '[HIDDEN]'
 * @param locator
 * @param value value filled into input
 */
export async function safeHiddenValuesFill(
  locator: Locator,
  value: string
): Promise<void> {
  await locator.fill('[HIDDEN]');
  await locator.evaluate((el, val) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (el as any).value = val;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
}
