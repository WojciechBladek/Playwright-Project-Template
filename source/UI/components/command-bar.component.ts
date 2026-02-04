import { ButtonElement } from '@_source/UI/elements/button-element.decorator.js';
import { Page } from 'playwright';

/**
 * Example component
 */

export class CommandBarComponent {
  addButton: ButtonElement;

  constructor(protected page: Page) {
    this.addButton = new ButtonElement(this.page, 'Add');
  }
}
