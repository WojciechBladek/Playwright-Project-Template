import { BASE_API_URL } from '@_config/env.config';
import { APIRequestContext } from '@playwright/test';

export class BaseRequest {
  url: string;

  constructor(protected request: APIRequestContext) {
    this.url = BASE_API_URL;
  }
}
