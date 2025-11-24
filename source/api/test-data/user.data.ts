import { USER_NAME_API, USER_PASSWORD_API } from '@_config/env.config';
import { LoginUserModelApi } from '@_source/api/models/login.api.model';

export const testUser1_Api: LoginUserModelApi = {
  userEmail: USER_NAME_API,
  userPassword: USER_PASSWORD_API
};

export const testUser2_Api: LoginUserModelApi = {
  userEmail: USER_NAME_API + 'incorrectName',
  userPassword: USER_PASSWORD_API + 'incorrectPassword'
};
