/* eslint-disable playwright/no-standalone-expect */
import { HealthRequest } from '@_source/api/requests/health.request';
import { expect, test as health } from '@_source/merge.fixture';

/**
 * Create health checks, this is example health checkout
 */
health('verify if application is in correct state', async ({ request }) => {
  // Arrange
  const healthRequest = new HealthRequest(request);

  // Act
  const response = await healthRequest.get();

  // Assert
  await expect(response, 'application is in correct state').toBeOK();
});
