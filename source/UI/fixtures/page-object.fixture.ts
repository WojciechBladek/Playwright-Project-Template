import { HomePage } from '@_source/UI/pages/home.page';
import { LoginPage } from '@_source/UI/pages/login.page';
import { RegisterPage } from '@_source/UI/pages/register.page';
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
