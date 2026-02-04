import { test } from '@_source/merge.fixture.js';

/**
 * Create example home page smoke tests
 * Session storage do not work on this example public project, its a example how to use it in real project
 */

test.describe(
  'Home page - smoke tests',
  {
    tag: ['@SMOKE']
  },
  () => {
    // eslint-disable-next-line playwright/expect-expect, @typescript-eslint/no-unused-vars
    test('Verify home page sections', async ({ homePage }) => {
      // Arrange:
      // Act:
      // Assert:
    });
  }
);
