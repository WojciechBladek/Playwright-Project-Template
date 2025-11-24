import { prepareRandomUserData } from '@_source/UI/factories/user.factory';
import { RegisterUserModelUi } from '@_source/UI/models/user.model';
import { expect, test } from '@_source/merge.fixture';

test.describe(
  'Create new user',
  {
    tag: ['@INTEGRATION']
  },
  () => {
    test('Register user', async ({ registerPage }) => {
      // Arrange:
      const registerData: RegisterUserModelUi = prepareRandomUserData();

      // Act:
      await registerPage.registerNewUser(registerData);

      // Assert:
      await expect(
        registerPage.continueButton,
        'Created new user with success'
      ).toBeVisible();

      await registerPage.continueButton.click();
    });
  }
);
