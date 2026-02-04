import Logger from '@_logger/Logger.js';
import { delay } from '@_source/UI/helpers/delay.helper.js';
import { waitUntilElementIsVisible } from '@_source/UI/helpers/wait-for-element.helper.js';
import { Page, expect } from '@playwright/test';

export class BasePage {
  url: string;

  constructor(protected page: Page) {
    this.url = '/';
  }

  async goto(waitForUrl?: string): Promise<void> {
    await this.page.context().clearCookies();
    await this.handleCookies();

    await this.page.goto(this.url);
    await this.removeCookieFromDom();

    if (waitForUrl) {
      await this.waitForPageToLoadUrl(waitForUrl);
    }
  }

  async handleCookies(): Promise<void> {
    await this.page.route('**static/js/subscription.js', (route) =>
      route.abort()
    );
  }

  async removeCookieFromDom(): Promise<void> {
    await waitUntilElementIsVisible(
      this.page.locator('[class="fc-consent-root"]')
    );
    try {
      await this.page.evaluate(() => {
        const selector = document.querySelector('[class="fc-consent-root"]');
        selector.remove();
      });
      await delay(1_000);
    } catch {
      Logger.info(
        'Already closed or do not occurs cookie message class in dom'
      );
    }
  }

  async setLocalStorageKey(key: string, value: string): Promise<void> {
    await this.page.evaluate(
      ({ key, value }) => {
        localStorage.setItem(key, value);
      },
      { key, value }
    );
    await this.page.reload();

    const expectedValue = await this.page.evaluate(
      ({ key }) => {
        return localStorage.getItem(key);
      },
      { key }
    );
    expect(
      expectedValue,
      `Should be set key: "${key}" with value: "${value}" in local storage`
    ).toBe(value);
  }

  async goBackToThePreviousPage(): Promise<void> {
    await this.page.goBack();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageToLoadUrl(expectedPath: string): Promise<void> {
    try {
      await this.page.waitForURL(expectedPath, { timeout: 20_000 });
    } catch (e) {
      Logger.warn(
        `Url after navigation was "${this.page.url()}" but should contain "${expectedPath}", error: ${e}`
      );
    }
  }

  returnPageUrl(): string {
    return this.page.url();
  }
}
