import { APIRequestContext } from '@playwright/test';

export class BaseRequest {
  constructor(protected request: APIRequestContext) {}
}
