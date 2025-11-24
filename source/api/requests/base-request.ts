import { BASE_API_URL } from '@_config/env.config';
import { RequestHeaders } from '@_source/api/models/headers.api.model';
import { APIRequestContext } from '@playwright/test';

export class BaseRequest {
  url: string;
  token: RequestHeaders;

  constructor(
    protected request: APIRequestContext,
    protected AuthorizationHeaders?: RequestHeaders
  ) {
    this.url = BASE_API_URL;
    this.token = this.AuthorizationHeaders || {};
  }
}
