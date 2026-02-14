import { BaseRequest } from '@_api_source/requests/base-request.js';
import { apiErrorHandler } from '@_api_source/utils/api-error-handler.util.js';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class HealthRequest extends BaseRequest {
  constructor(protected request: APIRequestContext) {
    super(request);
  }

  async get(): Promise<APIResponse> {
    const response = await this.request.get('/');

    await apiErrorHandler(response);
    return response;
  }
}
