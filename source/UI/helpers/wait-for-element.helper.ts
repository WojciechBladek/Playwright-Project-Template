import Logger from '@_logger/Logger';
import { WAIT_FOR_TIMEOUT, WAIT_FOR_TIMEOUT_SHORT } from '@_pw-config';
import { getCallerInfo } from '@_source/UI/helpers/get-caller-info.helper';
import { Locator } from '@playwright/test';

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
