import { LoaderElement } from '@_source/UI/elements/loader-element.decorator.js';
import { waitUntilElementIsVisible } from '@_source/UI/helpers/wait-for-element.helper.js';
import { Locator, Page } from 'playwright';

/**
 * Example element
 */
export class ButtonElement {
  private buttonElement: Locator;
  private loader: LoaderElement;

  constructor(
    protected page: Page,
    private buttonName: string
  ) {
    this.buttonElement = this.page.getByRole('button', {
      name: this.buttonName,
      exact: true
    });
    this.loader = new LoaderElement(this.page);
  }

  async click(): Promise<void> {
    await waitUntilElementIsVisible(this.buttonElement, 15_000);
    try {
      await this.buttonElement.click();
      await this.loader.waitFor({ state: 'visible-and-hidden' });
    } catch {
      throw new Error(`Failed click on button named: "${this.buttonName}"`);
    }
  }
}
