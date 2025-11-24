import { waitUntilElementIsVisible } from '@_source/UI/helpers/wait-for-element.helper';
import { Download, Locator, Page } from '@playwright/test';
import * as path from 'path';

export async function openLinkInBrowser(
  page: Page,
  clipboardContent: string
): Promise<Download[]> {
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.evaluate((link) => {
      window.location.href = link;
    }, clipboardContent)
  ]);

  return [download];
}

export async function downloadFile(
  page: Page,
  downloadPath: string,
  downloadButton: Locator | (() => Promise<void>),
  downloadedFileName?: string
): Promise<string> {
  try {
    if (typeof downloadButton !== 'function') {
      await waitUntilElementIsVisible(downloadButton);
    } else {
      // implement wait method
    }

    const downloadPromise = page.waitForEvent('download', { timeout: 40_000 });

    if (typeof downloadButton === 'function') {
      await downloadButton();
    } else {
      await downloadButton.click();
    }

    const download = await downloadPromise;
    const savePath = path.resolve(
      downloadPath,
      downloadedFileName + download.suggestedFilename()
    );
    await download.saveAs(savePath);
    return savePath;
  } catch (e) {
    throw new Error(`Failed to download or save file, "${e}"`);
  }
}
