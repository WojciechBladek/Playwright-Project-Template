import { MainMenuComponent } from '@_source/UI/components/main-menu.component';
import { safeHiddenValuesFill } from '@_source/UI/helpers/safe-fill.helper';
import { waitUntilElementIsVisible } from '@_source/UI/helpers/wait-for-element.helper';
import { LoginModelUi } from '@_source/UI/models/user.model';
import { BasePage } from '@_source/UI/pages/base.page';
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
