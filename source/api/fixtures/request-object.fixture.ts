import { HealthRequest } from '@_source/api/requests/health.request.js';
import { UserRequest } from '@_source/api/requests/user.request.js';
import { getAuthorizationRequest } from '@_source/api/utils/generate-token.util.js';
// import { getApiTokenFromFile } from '@_source/api/utils/get-token-from-file.util';
import { test as baseTest } from '@playwright/test';

interface Requests {
  userRequest: UserRequest;
  healthRequest: HealthRequest;
}

export const requestObjectTest = baseTest.extend<Requests>({
  userRequest: async ({}, use) => {
    const request = await getAuthorizationRequest(); //* Recommended
    // const request = await getApiTokenFromFile.AuthorizationRequest(); //* Example of use get-token-from-file.util.ts

    const userRequest = new UserRequest(request);

    await use(userRequest);
  },

  healthRequest: async ({ request }, use) => {
    const healthRequest = new HealthRequest(request);

    await use(healthRequest);
  }
});
