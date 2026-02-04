import { MainMenuComponent } from '@_source/UI/components/main-menu.component.js';
import { BasePage } from '@_source/UI/pages/base.page.js';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  mainMenuComponent: MainMenuComponent;

  constructor(page: Page) {
    super(page);
  }
}
