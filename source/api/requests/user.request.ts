import { RequestHeaders } from '@_source/api/models/headers.api.model';
import { BaseRequest } from '@_source/api/requests/base-request';
import { apiEndpoints } from '@_source/api/utils/endpoints.util';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class UserRequest extends BaseRequest {
  constructor(
    protected request: APIRequestContext,
    protected AuthorizationHeaders: RequestHeaders
  ) {
    super(request, AuthorizationHeaders);
  }

  async getAllUsers(): Promise<APIResponse> {
    return await this.request.get(this.url + apiEndpoints.usersUrl, {
      headers: { ...this.token }
    });
  }

  async getUser(userId: string): Promise<APIResponse> {
    return await this.request.get(
      this.url + apiEndpoints.usersUrl + `/${userId}`,
      {
        headers: { ...this.token }
      }
    );
  }

  async getUserMe(): Promise<APIResponse> {
    return await this.request.get(this.url + apiEndpoints.userUrl + '/me', {
      headers: { ...this.token, 'Content-Type': 'application/json' }
    });
  }
}
