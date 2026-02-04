import { Locator, Page } from '@playwright/test';

/**
 * Example component
 */

export class MainMenuComponent {
  topMenu: Locator;

  logoutButton: Locator;
  constructor(protected page: Page) {
    this.topMenu = this.page.locator('[class="nav navbar-nav"]');

    this.logoutButton = this.topMenu.locator('a[href="/logout"]');
  }
}
