import { BaseRequest } from '@_source/api/requests/base-request';
import { apiErrorHandler } from '@_source/api/utils/api-error-handler.util';
import { apiEndpoints } from '@_source/api/utils/endpoints.util';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class UserRequest extends BaseRequest {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  async getAllUsers(): Promise<APIResponse> {
    const response = await this.request.get(apiEndpoints.usersUrl);

    await apiErrorHandler(response, 'Get all users request failed');

    return response;
  }

  async getUser(userId: string): Promise<APIResponse> {
    const response = await this.request.get(
      apiEndpoints.usersUrl + `/${userId}`
    );

    await apiErrorHandler(response, 'Get user request failed');

    return response;
  }

  async getUserMe(): Promise<APIResponse> {
    const response = await this.request.get(apiEndpoints.userUrl + '/me', {
      headers: { 'Content-Type': 'application/json' }
    });

    await apiErrorHandler(response, 'Get user me request failed');

    return response;
  }
}
