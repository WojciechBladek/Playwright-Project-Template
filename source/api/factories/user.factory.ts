import { RegisterUserModelApi } from '@_api_source/models/login.api.model.js';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomUserData(): RegisterUserModelApi {
  const registerUserData: RegisterUserModelApi = {
    username: faker.internet.email({ provider: 'example.com' }),
    password: faker.internet.password({ length: 20 })
  };

  return registerUserData;
}
