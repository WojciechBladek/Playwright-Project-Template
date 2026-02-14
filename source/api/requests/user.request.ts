import { BaseRequest } from '@_api_source/requests/base-request.js';
import { apiErrorHandler } from '@_api_source/utils/api-error-handler.util.js';
import { apiEndpoints } from '@_api_source/utils/endpoints.util.js';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class UserRequest extends BaseRequest {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  async getAllUsers(): Promise<APIResponse> {
    const response = await this.request.get(apiEndpoints.usersUrl);

    await apiErrorHandler(response);
    return response;
  }

  async getUser(userId: string): Promise<APIResponse> {
    const response = await this.request.get(
      apiEndpoints.usersUrl + `/${userId}`
    );

    await apiErrorHandler(response);
    return response;
  }

  async getUserMe(): Promise<APIResponse> {
    const response = await this.request.get(apiEndpoints.userUrl + '/me', {
      headers: { 'Content-Type': 'application/json' }
    });

    await apiErrorHandler(response);

    return response;
  }
}
