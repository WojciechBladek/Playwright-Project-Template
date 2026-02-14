import { expect, test } from '@_merge_fixtures_source';
import { prepareRandomUserData } from '@_ui_source/factories/user.factory.js';
import { RegisterUserModelUi } from '@_ui_source/models/user.model.js';

test.describe(
  'Create new user',
  {
    tag: ['@INTEGRATION', '@NON-LOGGED']
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
