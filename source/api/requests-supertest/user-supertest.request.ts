import { BaseSuperTest } from '@_source/api/requests-supertest/base-supertest';
import { apiEndpoints } from '@_source/api/utils/endpoints.util';
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
