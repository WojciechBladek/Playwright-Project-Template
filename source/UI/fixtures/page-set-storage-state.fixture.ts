import { BrowserContext, Page, test as baseTest } from '@playwright/test';

interface MyTestFixtures {
  setBrowserStorageState: (
    storagePath: string
  ) => Promise<{ context: BrowserContext; page: Page }>;
}

export const pageObjectSetStorageState = baseTest.extend<MyTestFixtures>({
  setBrowserStorageState: async ({ browser }, use) => {
    const newBrowserContext = async (
      storagePath: string
    ): Promise<{ context: BrowserContext; page: Page }> => {
      const context = await browser.newContext({
        storageState: storagePath
      });
      const page = await context.newPage();

      return {
        context: context,
        page: page
      };
    };

    await use(newBrowserContext);
  }
});
