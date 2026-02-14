import { LoginUserModelApi } from '@_api_source/models/login.api.model.js';
import { BaseRequest } from '@_api_source/requests/base-request.js';
import { apiErrorHandler } from '@_api_source/utils/api-error-handler.util.js';
import { apiEndpoints } from '@_api_source/utils/endpoints.util.js';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class LoginRequest extends BaseRequest {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  async login(loginData: LoginUserModelApi): Promise<APIResponse> {
    const response = await this.request.post(apiEndpoints.authLoginUrl, {
      data: loginData
    });
    await apiErrorHandler(response);
    return response;
  }
}
