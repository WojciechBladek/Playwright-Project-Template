import { test as baseTest, expect } from '@playwright/test';

export const eventListener = baseTest.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('response', (data) => {
      const status = data.status();

      if (status >= 500) {
        errors.push(`Error response: ${status} for ${data.url()}`);
      }
    });

    await use(page);

    expect
      .soft(errors, `There were response errors:\n${errors.join('\n')}`)
      .toHaveLength(0);
  }
});
