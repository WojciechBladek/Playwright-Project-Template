import { BaseSuperTest } from '@_api_source/requests-supertest/base-supertest.js';
import { apiEndpoints } from '@_api_source/utils/endpoints.util.js';
import { Response } from 'supertest';

export class UserRequestSuperTest extends BaseSuperTest {
  constructor(protected token?: string) {
    super(token);
  }

  async getAllUsers(): Promise<Response> {
    return await this.requestApi.get(apiEndpoints.usersUrl);
  }

  async getUser(userId: string): Promise<Response> {
    return await this.requestApi.get(apiEndpoints.usersUrl + `/${userId}`);
  }

  async getUserMe(): Promise<Response> {
    return await this.requestApi.get(apiEndpoints.userUrl + '/me');
  }
}
