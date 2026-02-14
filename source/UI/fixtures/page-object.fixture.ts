import { HomePage } from '@_ui_source/pages/home.page.js';
import { LoginPage } from '@_ui_source/pages/login.page.js';
import { RegisterPage } from '@_ui_source/pages/register.page.js';
import { test as baseTest } from '@playwright/test';

export interface Pages {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  homePage: HomePage;
}

export const pageObjectTest = baseTest.extend<Pages>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await use(registerPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await use(homePage);
  }
});
