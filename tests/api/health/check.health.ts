/* eslint-disable playwright/no-standalone-expect */
import { expect, test as health } from '@_merge_fixtures_source';

/**
 * Create health checks, this is example health checkout
 */
health(
  'verify if application is in correct state',
  async ({ healthRequest }) => {
    // Act
    const response = await healthRequest.get();

    // Assert
    await expect(response, 'application is in correct state').toBeOK();
  }
);
