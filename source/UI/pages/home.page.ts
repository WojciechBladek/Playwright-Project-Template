import { MainMenuComponent } from '@_ui_source/components/main-menu.component.js';
import { BasePage } from '@_ui_source/pages/base.page.js';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  mainMenuComponent: MainMenuComponent;

  constructor(page: Page) {
    super(page);

    this.mainMenuComponent = new MainMenuComponent(this.page);
  }
}
