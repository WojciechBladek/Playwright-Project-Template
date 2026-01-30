import { LoginUserModelApi } from '@_source/api/models/login.api.model';
import { BaseSuperTest } from '@_source/api/requests-supertest/base-supertest';
import { apiEndpoints } from '@_source/api/utils/endpoints.util';
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
