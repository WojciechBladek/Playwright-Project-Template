import { safeHiddenValuesFill } from '@_source/UI/helpers/safe-fill.helper';
import { RegisterUserModelUi } from '@_source/UI/models/user.model';
import { BasePage } from '@_source/UI/pages/base.page';
import { Locator, Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  registerNameInput: Locator;
  registerEmailInput: Locator;
  signUpButton: Locator;
  genderTitleCheckboxMr: Locator;
  passwordInput: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  addressInput: Locator;
  stateInput: Locator;
  cityInput: Locator;
  zipCodeInput: Locator;
  mobileNumberInput: Locator;
  continueButton: Locator;
  daysSelect: Locator;
  monthsSelect: Locator;
  yearsSelect: Locator;
  constructor(page: Page) {
    super(page);

    this.url = '/login';

    this.registerNameInput = this.page.locator('[data-qa="signup-name"]');
    this.registerEmailInput = this.page.locator('[data-qa="signup-email"]');
    this.signUpButton = this.page.locator('[data-qa="signup-button"]');
    this.genderTitleCheckboxMr = this.page.locator('#id_gender1');
    this.passwordInput = this.page.locator('[data-qa="password"]');
    this.firstNameInput = this.page.locator('[data-qa="first_name"]');
    this.lastNameInput = this.page.locator('[data-qa="last_name"]');
    this.addressInput = this.page.locator('[data-qa="address"]');
    this.stateInput = this.page.locator('[data-qa="state"]');
    this.cityInput = this.page.locator('[data-qa="city"]');
    this.zipCodeInput = this.page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = this.page.locator('[data-qa="mobile_number"]');
    this.continueButton = this.page.locator('[data-qa="continue-button"]');
    this.daysSelect = this.page.locator('#days');
    this.monthsSelect = this.page.locator('#months');
    this.yearsSelect = this.page.locator('#years');
  }

  async registerNewUser(registerUserData: RegisterUserModelUi): Promise<void> {
    await safeHiddenValuesFill(
      this.registerNameInput,
      registerUserData.userName
    );
    await safeHiddenValuesFill(
      this.registerEmailInput,
      registerUserData.userEmail
    );

    await this.signUpButton.click();
    await this.page.waitForURL('**/signup');
    await this.removeCookieFromDom();

    await this.genderTitleCheckboxMr.click();

    await safeHiddenValuesFill(
      this.passwordInput,
      registerUserData.userPassword
    );

    await this.daysSelect.selectOption('1');
    await this.monthsSelect.selectOption('1');
    await this.yearsSelect.selectOption('2000');

    await this.passwordInput.press('Enter');

    await safeHiddenValuesFill(this.firstNameInput, registerUserData.firstName);
    await safeHiddenValuesFill(this.lastNameInput, registerUserData.lastName);
    await safeHiddenValuesFill(this.addressInput, registerUserData.address);
    await this.addressInput.press('Enter');

    await this.page.getByLabel('Country *').selectOption('United States');
    await safeHiddenValuesFill(this.stateInput, registerUserData.state);
    await this.stateInput.press('Enter');

    await safeHiddenValuesFill(this.cityInput, registerUserData.city);
    await this.cityInput.press('Enter');

    await safeHiddenValuesFill(this.zipCodeInput, registerUserData.zipCode);
    await this.zipCodeInput.press('Enter');

    await safeHiddenValuesFill(
      this.mobileNumberInput,
      registerUserData.zipCode
    );
    await this.mobileNumberInput.press('Enter');

    await this.page.waitForURL('**/account_created');
    await this.removeCookieFromDom();
  }
}
