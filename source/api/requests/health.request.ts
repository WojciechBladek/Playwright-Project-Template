import { RequestHeaders } from '@_source/api/models/headers.api.model';
import { BaseRequest } from '@_source/api/requests/base-request';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class HealthRequest extends BaseRequest {
  constructor(
    protected request: APIRequestContext,
    protected AuthorizationHeaders?: RequestHeaders
  ) {
    super(request);
  }

  async get(): Promise<APIResponse> {
    return await this.request.get(this.url);
  }
}
