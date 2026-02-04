import { LoginUserModelApi } from '@_source/api/models/login.api.model.js';
import { BaseSuperTest } from '@_source/api/requests-supertest/base-supertest.js';
import { apiEndpoints } from '@_source/api/utils/endpoints.util.js';
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
