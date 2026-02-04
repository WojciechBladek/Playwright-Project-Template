import { STORAGE_STATE_PATH } from '@_pw-config';
import { delay } from '@_source/UI/helpers/delay.helper.js';
import { testUser1_Ui } from '@_source/UI/test-data/user.data.js';
import { expect, test as setup } from '@_source/merge.fixture.js';

/**
 * Use commented code if need get api token when login on UI
 * Session storage do not work on this example public project, its a example how to use it in real project
 */

setup.describe('Get UI session', () => {
  setup('Login as Admin', async ({ page, loginPage }) => {
    try {
      // const responsePromise = page.waitForResponse('**/token*');
      await loginPage.login(testUser1_Ui);

      // const response = await responsePromise;
      // const responseJson = await response.json();
      // const accessToken = responseJson?.access_token;

      // writeJsonFile(API_TOKEN_PATH, accessToken);

      await expect(
        loginPage.mainMenuComponent.logoutButton,
        'User should be logged'
      ).toBeVisible({
        timeout: 15_000
      });

      await delay(5000);
      await page.context().storageState({ path: STORAGE_STATE_PATH });
    } catch (e) {
      throw new Error(
        `Failed to create auth session for: ${testUser1_Ui.userEmail}, error: ${e}`
      );
    }
  });
});
