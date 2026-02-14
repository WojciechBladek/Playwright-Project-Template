import { safeHiddenValuesFill } from '@_common_source/helpers/element-safe-fill.helper.js';
import { waitUntilElementIsVisible } from '@_common_source/helpers/element.helper.js';
import { MainMenuComponent } from '@_ui_source/components/main-menu.component.js';
import { LoginModelUi } from '@_ui_source/models/user.model.js';
import { BasePage } from '@_ui_source/pages/base.page.js';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  mainMenuComponent: MainMenuComponent;

  loginEmailInput: Locator;
  loginPasswordInput: Locator;
  loginButton: Locator;
  acceptConsent: Locator;
  constructor(page: Page) {
    super(page);

    this.url = '/login';

    this.mainMenuComponent = new MainMenuComponent(this.page);

    this.loginEmailInput = this.page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = this.page.locator('[data-qa="login-password"]');
    this.loginButton = this.page.locator('[data-qa="login-button"]');

    this.acceptConsent = this.page
      .locator('[class="fc-button-label"]')
      .getByText('Zgadzam się');
  }

  async login(loginCredentials: LoginModelUi): Promise<void> {
    await safeHiddenValuesFill(
      this.loginEmailInput,
      loginCredentials.userEmail
    );
    await safeHiddenValuesFill(
      this.loginPasswordInput,
      loginCredentials.userPassword
    );

    await this.loginButton.click();

    await waitUntilElementIsVisible(this.acceptConsent);
    this.acceptConsent.click();
  }
}
