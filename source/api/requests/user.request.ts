import { BaseRequest } from '@_source/api/requests/base-request';
import { apiEndpoints } from '@_source/api/utils/endpoints.util';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class UserRequest extends BaseRequest {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  async getAllUsers(): Promise<APIResponse> {
    return await this.request.get(this.url + apiEndpoints.usersUrl);
  }

  async getUser(userId: string): Promise<APIResponse> {
    return await this.request.get(
      this.url + apiEndpoints.usersUrl + `/${userId}`
    );
  }

  async getUserMe(): Promise<APIResponse> {
    return await this.request.get(this.url + apiEndpoints.userUrl + '/me', {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
