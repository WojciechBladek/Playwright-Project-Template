import { APIRequestContext } from '@playwright/test';

export class BaseRequest {
  url: string;

  constructor(protected request: APIRequestContext) {}
}
