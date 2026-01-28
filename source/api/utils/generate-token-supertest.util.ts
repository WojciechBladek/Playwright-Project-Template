import { LoginUserModelApi } from '@_source/api/models/login.api.model';
import { LoginRequestSuperTest } from '@_source/api/requests-supertest/login-supertest.request';
import { testUser1_Api } from '@_source/api/test-data/user.data';

export async function getTokenSuperTest(
  loginData?: LoginUserModelApi
): Promise<string> {
  loginData = loginData || testUser1_Api;

  const loginRequest = new LoginRequestSuperTest();
  const responseLogin = await loginRequest.login(loginData);
  const token = responseLogin.body.accessToken;

  return token;
}
