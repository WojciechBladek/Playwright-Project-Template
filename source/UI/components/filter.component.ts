import { LoaderElement } from '@_source/UI/elements/loader-element.decorator.js';
import { waitUntilElementIsVisible } from '@_source/UI/helpers/wait-for-element.helper.js';
import { Locator, Page } from '@playwright/test';

/**
 * Example component
 */

export class FilterComponent {
  loaderElement: LoaderElement;

  searchButton: Locator;
  searchInput: Locator;

  constructor(protected page: Page) {
    this.loaderElement = new LoaderElement(this.page);

    this.searchButton = this.page.locator('#example_button');
    this.searchInput = this.page.locator('#example_input');
  }

  async applyFilters(phrase: string): Promise<void> {
    await waitUntilElementIsVisible(this.searchButton);
    await this.searchButton.click();
    await this.searchInput.fill(phrase);
    await this.searchInput.press('Enter');

    await this.loaderElement.waitFor({ state: 'visible-and-hidden' });
  }
}
