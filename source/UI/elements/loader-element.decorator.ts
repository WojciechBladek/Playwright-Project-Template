import {
  waitUntilElementIsHidden,
  waitUntilElementIsVisible
} from '@_common_source/helpers/element.helper.js';
import Logger from '@_logger/Logger.js';
import { Locator, Page } from 'playwright';

/**
 * Example element
 */

interface LoaderOptions {
  state: 'visible' | 'hidden' | 'visible-and-hidden';
  timeout?: number;
}

/** 
  @info reusable element, loader/spinner element on page
  @param options.state 'visible' | 'hidden' | 'visible-and-hidden'
  @example 'of use in class'
  private loader: LoaderElementIA
  this.loader = new LoaderElementIA(this.page);
  await this.loader.waitFor({ state: 'visible-and-hidden' })
  */
export class LoaderElement {
  private loaderElement: Locator;

  constructor(protected page: Page) {
    this.loaderElement = this.page.locator('#loader-container_example');
  }

  async waitFor(options: LoaderOptions): Promise<void> {
    if (options.state === 'visible') {
      await this.visible(options.timeout);
    } else if (options.state === 'hidden') {
      await this.hide(options.timeout);
    } else if (options.state === 'visible-and-hidden') {
      await this.visible(options.timeout);
      await this.hide(options.timeout);
    }
  }

  private async visible(timeout = 2_500): Promise<void> {
    Logger.info('Wait until loader will be visible...');
    await waitUntilElementIsVisible(this.loaderElement, timeout);
  }

  private async hide(timeout = 30_000): Promise<void> {
    Logger.info('Wait until loader will be hidden...');
    await waitUntilElementIsHidden(this.loaderElement, timeout);
  }
}
