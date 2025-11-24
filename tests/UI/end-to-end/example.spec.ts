import { test } from '@_source/merge.fixture';

/**
 * Create example home page smoke tests
 * Session storage do not work on this example public project, its a example how to use it in real project
 */

test.describe(
  'Example end to end',
  {
    tag: ['@E2E']
  },
  () => {
    // eslint-disable-next-line playwright/expect-expect, @typescript-eslint/no-unused-vars
    test('template', async ({ homePage }) => {
      // Arrange:
      // Act:
      // Assert:
    });
  }
);
