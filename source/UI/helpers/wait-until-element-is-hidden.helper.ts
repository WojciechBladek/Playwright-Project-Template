import Logger from '@_logger/Logger.js';
import { WAIT_FOR_TIMEOUT } from '@_pw-config';
import { getCallerInfo } from '@_source/UI/helpers/get-caller-info.helper';
import { Locator } from '@playwright/test';

const ATTEMPTS = 5;

export async function waitUntilElementIsHidden(
  hiddenElement: Locator,
  timeout = WAIT_FOR_TIMEOUT,
  maxAttempts = ATTEMPTS
): Promise<void> {
  const caller = getCallerInfo();

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await hiddenElement.waitFor({
        state: 'hidden',
        timeout: timeout
      });
      return;
    } catch (error) {
      if (attempt === maxAttempts) {
        Logger.info(`Called from: ${caller}`);
        throw new Error(
          `Element is still visible after ${maxAttempts} attempts. Last error: ${error}`
        );
      }
    }
  }
}

export async function waitUntilElementIsHiddenAndReturnResult(
  hiddenElement: Locator,
  timeout = WAIT_FOR_TIMEOUT,
  maxAttempts = ATTEMPTS
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
