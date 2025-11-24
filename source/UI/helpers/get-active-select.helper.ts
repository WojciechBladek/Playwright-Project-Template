import { Locator } from '@playwright/test';

export async function getActiveSelectText(
  selectElement: Locator
): Promise<string> {
  return await selectElement.evaluate((select: HTMLSelectElement) => {
    const selectedIndex = select.selectedIndex;
    return select.options[selectedIndex].text;
  });
}
