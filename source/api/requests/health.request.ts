import { BaseRequest } from '@_source/api/requests/base-request';
import { apiErrorHandler } from '@_source/api/utils/api-error-handler.util';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class HealthRequest extends BaseRequest {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  async get(): Promise<APIResponse> {
    const response = await this.request.get('/');
    await apiErrorHandler(response, 'Health check failed');

    return response;
  }
}
