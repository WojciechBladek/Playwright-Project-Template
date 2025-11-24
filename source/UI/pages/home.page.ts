import { MainMenuComponent } from '@_source/UI/components/main-menu.component';
import { BasePage } from '@_source/UI/pages/base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  mainMenuComponent: MainMenuComponent;

  constructor(page: Page) {
    super(page);
  }
}
