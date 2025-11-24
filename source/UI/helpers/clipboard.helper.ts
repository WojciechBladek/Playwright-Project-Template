import { Page } from '@playwright/test';

export async function getClipboardText(page: Page): Promise<string> {
  return page.evaluate(async () => {
    return await navigator.clipboard.readText();
  });
}
