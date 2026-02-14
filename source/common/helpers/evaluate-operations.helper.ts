import { Page } from '@playwright/test';

export async function getClipboardText(page: Page): Promise<string> {
  return page.evaluate(async () => {
    return await navigator.clipboard.readText();
  });
}

export async function getAllLinksFromPage(page: Page): Promise<string[]> {
  const links = await page.evaluate(() => {
    const href = document.querySelectorAll('a');
    return Array.from(href).map((link) => link.href);
  });
  return links;
}
