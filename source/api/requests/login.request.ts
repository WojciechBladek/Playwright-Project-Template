import { LoginUserModelApi } from '@_source/api/models/login.api.model';
import { BaseRequest } from '@_source/api/requests/base-request';
import { apiEndpoints } from '@_source/api/utils/endpoints.util';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class LoginRequest extends BaseRequest {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  async login(loginData: LoginUserModelApi): Promise<APIResponse> {
    return await this.request.post(this.url + apiEndpoints.authLoginUrl, {
      data: loginData
    });
  }
}
