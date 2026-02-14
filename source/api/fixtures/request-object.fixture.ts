// import { getApiTokenFromFile } from '@_source/api/utils/get-token-from-file.util';
import { HealthRequest } from '@_api_source/requests/health.request.js';
import { UserRequest } from '@_api_source/requests/user.request.js';
import { getAuthorizationRequest } from '@_api_source/utils/generate-token.util.js';
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
