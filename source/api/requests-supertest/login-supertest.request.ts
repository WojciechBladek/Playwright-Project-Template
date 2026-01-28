import { LoginUserModelApi } from '@_source/api/models/login.api.model';
import { BaseSuperTest } from '@_source/api/requests-supertest/base-supertest';
import { apiEndpoints } from '@_source/api/utils/endpoints.util';
import { Response } from 'supertest';

export class LoginRequestSuperTest extends BaseSuperTest {
  constructor(protected baseUrl?: string) {
    super(baseUrl);
  }

  async login(loginData: LoginUserModelApi): Promise<Response> {
    return await this.post({
      endpoint: apiEndpoints.authLoginUrl,
      payload: loginData
    });
  }
}
