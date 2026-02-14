import { LoginUserModelApi } from '@_api_source/models/login.api.model.js';
import { LoginRequestSuperTest } from '@_api_source/requests-supertest/login-supertest.request.js';
import { testUser1_Api } from '@_api_source/test-data/user.data.js';

export async function getTokenSuperTest(
  loginData?: LoginUserModelApi
): Promise<string> {
  loginData = loginData || testUser1_Api;

  const loginRequest = new LoginRequestSuperTest();
  const responseLogin = await loginRequest.login(loginData);
  const token = responseLogin.body.accessToken;

  return token;
}
