import { LoginUserModelApi } from '@_source/api/models/login.api.model';
import { LoginRequest } from '@_source/api/requests/login.request';
import { testUser1_Api } from '@_source/api/test-data/user.data';
import { stringifyJsonData } from '@_source/utils/json-handler.util';
import { APIRequestContext, request as newRequest } from '@playwright/test';

export async function getAuthorizationRequest(
  loginData?: LoginUserModelApi
): Promise<APIRequestContext> {
  loginData = loginData || testUser1_Api;

  const request = await newRequest.newContext({});

  const loginRequest = new LoginRequest(request);
  const responseLogin = await loginRequest.login(loginData);
  const responseLoginJson = await responseLogin?.json();

  if (!responseLogin.ok()) {
    throw new Error(
      `Can't generate authorization header, 
      status code: ${responseLogin.status()},
      response: ${stringifyJsonData(responseLogin.text())},
      responseJson: ${stringifyJsonData(responseLoginJson)}
      `
    );
  }

  return request;
}
