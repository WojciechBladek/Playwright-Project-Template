/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginUserModelApi } from '@_source/api/models/login.api.model';
import { BaseRequest } from '@_source/api/requests/base-request';
import { getAuthorizationRequest } from '@_source/api/utils/generate-token.util';
import { test as base } from '@playwright/test';

/** 
  The `apiClient` fixture automatically logs in the user and returns
  a ready-to-use instance of the API class (e.g., UserRequest) with the token set.
  This allows you to quickly create API objects in your test without having to repeat 
  the login process and manually pass tokens. 
  Example: 
      const userApi = await apiClient(loginData, UserRequest); 
  Fixture:  
  - logs in the user    
  - retrieves the token 
  - creates new UserRequest(request, token) 
  - sets the optional baseUrl 
    Returns a ready object that you can immediately use for API calls. 

    Example of use in tests/api/users-example.spec.ts - Suite name: `Verify user "${user.username}" - role privileges`
*/

type Constructor<T> = new (...args: any[]) => T;

export const apiClientTest = base.extend<{
  apiClient: <T extends BaseRequest>(
    classRef: Constructor<T>,
    loginData?: LoginUserModelApi,
    baseUrl?: string
  ) => Promise<T>;
}>({
  apiClient: async ({ request }, use) => {
    const apiFactory = async <T extends BaseRequest>(
      classRef: Constructor<T>,
      loginData?: LoginUserModelApi,
      baseUrl?: string
    ): Promise<T> => {
      let requestApi = request;

      if (loginData) {
        requestApi = await getAuthorizationRequest(loginData);
      }

      const instance = new classRef(requestApi);

      if (baseUrl) {
        instance.url = baseUrl; //* Example how to set another base api url in fixture
      }

      return instance;
    };

    await use(apiFactory);
  }
});
