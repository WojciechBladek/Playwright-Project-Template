import { getCallerInfo } from '@_common_source/utils/debug.util.js';
import Logger from '@_logger/Logger.js';
import { WAIT_FOR_TIMEOUT, WAIT_FOR_TIMEOUT_SHORT } from '@_pw-config';
import { Locator } from '@playwright/test';

export async function getActiveSelectText(
  selectElement: Locator
): Promise<string> {
  return await selectElement.evaluate((select: HTMLSelectElement) => {
    const selectedIndex = select.selectedIndex;
    return select.options[selectedIndex].text;
  });
}

export async function waitUntilElementIsVisible(
  locator: Locator,
  timeout: number = WAIT_FOR_TIMEOUT
): Promise<boolean> {
  const caller = getCallerInfo();

  try {
    await locator.waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    Logger.info(
      `Element: "${locator}" did not become visible within ${timeout} ms`
    );
    Logger.info(`Called from: ${caller}`);
    Logger.info('****************************************');
    return false;
  }
}

export async function waitUntilElementIsVisibleShort(
  locator: Locator,
  timeout: number = WAIT_FOR_TIMEOUT_SHORT
): Promise<boolean> {
  return await waitUntilElementIsVisible(locator, timeout);
}

export async function waitUntilElementIsActive(
  locator: Locator,
  timeout: number = WAIT_FOR_TIMEOUT
): Promise<boolean> {
  const locatorAttribute = await locator.getAttribute('class');
  if (locatorAttribute?.includes('is-active')) {
    return true;
  } else {
    Logger.error(
      `Element: "${locator}" did not become active within ${timeout} ms`
    );
    Logger.info('****************************************');
    return false;
  }
}

export async function waitUntilElementIsHidden(
  hiddenElement: Locator,
  timeout = WAIT_FOR_TIMEOUT,
  maxAttempts = 5
): Promise<boolean> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await hiddenElement.waitFor({
        state: 'hidden',
        timeout
      });
      return true;
    } catch (error) {
      Logger.warn(
        `Attempt ${attempt}: Element "${hiddenElement}" is still visible after ${timeout} ms.`
      );
      Logger.warn('----------------------------------------');

      if (attempt === maxAttempts) {
        Logger.error(
          `Element is still visible after ${maxAttempts} attempts. Last error: ${error}`
        );
        return false;
      }
    }
  }

  return false;
}
