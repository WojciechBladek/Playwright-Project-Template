import { delay } from '@_common_source/helpers/delay.helper.js';
import { expect, test as setup } from '@_merge_fixtures_source';
import { STORAGE_STATE_PATH } from '@_pw-config';
import { testUser1_Ui } from '@_ui_source/test-data/user.data.js';

/**
 * Use commented code if need get api token when login on UI
 * Session storage do not work on this example public project, its a example how to use it in real project
 */

setup.describe('Get UI session', () => {
  setup('Login as Admin', { tag: '@SETUP' }, async ({ page, loginPage }) => {
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
