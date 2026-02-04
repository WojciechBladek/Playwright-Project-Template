import { LoginUserModelApi } from '@_source/api/models/login.api.model.js';
import { BaseRequest } from '@_source/api/requests/base-request.js';
import { apiThrowErrorHandler } from '@_source/api/utils/api-error-handler.util.js';
import { apiEndpoints } from '@_source/api/utils/endpoints.util.js';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class LoginRequest extends BaseRequest {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  async login(loginData: LoginUserModelApi): Promise<APIResponse> {
    const response = await this.request.post(apiEndpoints.authLoginUrl, {
      data: loginData
    });

    await apiThrowErrorHandler(response, "Can't generate authorization header");

    return response;
  }
}
