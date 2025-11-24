import { UserRequest } from '@_source/api/requests/user.request';
import { getAuthorizationHeader } from '@_source/api/utils/generate-token.util';
import { test as baseTest } from '@playwright/test';

interface Requests {
  userRequest: UserRequest;
}

export const requestObjectTest = baseTest.extend<Requests>({
  userRequest: async ({ request }, use) => {
    const token = await getAuthorizationHeader(); //* Recommended
    //const token = getApiTokenFromFile.AuthorizationHeader //* Example of use get-token-from-file.util.ts

    const userRequest = new UserRequest(request, token);

    //userRequest.url = ANOTHER_BASE_API_URL //* Example how to set another base api url in fixture

    await use(userRequest);
  }
});
