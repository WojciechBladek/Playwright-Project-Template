import { LoginUserModelApi } from '@_api_source/models/login.api.model.js';
import { BaseSuperTest } from '@_api_source/requests-supertest/base-supertest.js';
import { apiEndpoints } from '@_api_source/utils/endpoints.util.js';
import { Response } from 'supertest';

export class LoginRequestSuperTest extends BaseSuperTest {
  constructor() {
    super();
  }

  async login(loginData: LoginUserModelApi): Promise<Response> {
    return await this.requestApi
      .post(apiEndpoints.authLoginUrl)
      .send(loginData);
  }
}
