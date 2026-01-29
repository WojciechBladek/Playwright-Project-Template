import { BASE_API_URL } from '@_config/env.config';
import { LoginUserModelApi } from '@_source/api/models/login.api.model';
import { LoginRequest } from '@_source/api/requests/login.request';
import { testUser1_Api } from '@_source/api/test-data/user.data';
import { APIRequestContext, request as newRequest } from '@playwright/test';

export async function getAuthorizationRequest(
  loginData?: LoginUserModelApi
): Promise<APIRequestContext> {
  loginData = loginData || testUser1_Api;

  const request = await newRequest.newContext({ baseURL: BASE_API_URL });

  const loginRequest = new LoginRequest(request);
  await loginRequest.login(loginData);

  return request;
}
