import { LoginUserModelApi } from '@_api_source/models/login.api.model.js';
import { USER_NAME_API, USER_PASSWORD_API } from '@_config/env.config.js';

export const testUser1_Api: LoginUserModelApi = {
  username: USER_NAME_API,
  password: USER_PASSWORD_API
};

export const testUser2_Api: LoginUserModelApi = {
  username: USER_NAME_API + 'incorrectName',
  password: USER_PASSWORD_API + 'incorrectPassword'
};
