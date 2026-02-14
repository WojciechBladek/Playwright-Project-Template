import { LoginUserModelApi } from '@_api_source/models/login.api.model.js';
import { LoginRequest } from '@_api_source/requests/login.request.js';
import { testUser1_Api } from '@_api_source/test-data/user.data.js';
import { apiThrowErrorHandler } from '@_api_source/utils/api-error-handler.util.js';
import { BASE_API_URL } from '@_config/env.config.js';
import { APIRequestContext, request as newRequest } from '@playwright/test';

export async function getAuthorizationRequest(
  loginData?: LoginUserModelApi
): Promise<APIRequestContext> {
  loginData = loginData || testUser1_Api;

  const request = await newRequest.newContext({ baseURL: BASE_API_URL });

  const loginRequest = new LoginRequest(request);
  const responseLogin = await loginRequest.login(loginData);

  await apiThrowErrorHandler(responseLogin);

  return request;
}
