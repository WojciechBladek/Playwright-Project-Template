import Logger from '@_logger/Logger.js';
import { LoginUserModelApi } from '@_source/api/models/login.api.model.js';
import { UserRequest } from '@_source/api/requests/user.request.js';
import {
  testUser1_Api,
  testUser2_Api
} from '@_source/api/test-data/user.data.js';
import { expect, test } from '@_source/merge.fixture.js';

/*
Example simple api test scenario
*/

test.describe(
  'Verify users - example',
  {
    annotation: {
      type: 'task',
      description: 'jira link'
    }
  },
  () => {
    test(
      'Get all users',
      { tag: ['@API', '@USERS'] },
      async ({ userRequest }) => {
        // Arrange
        const expectedNotEmptyBody = 1;
        const expectedKeys = ['id', 'firstName', 'lastName', 'age'];

        // Act
        const response = await userRequest.getAllUsers();
        const responseJson: { users: object[] } = await response.json();
        const users = responseJson.users;

        // Assert
        expect(
          users.length,
          'Users object should be not empty'
        ).toBeGreaterThan(expectedNotEmptyBody);

        expectedKeys.forEach((key) => {
          expect
            .soft(users[0], `User should include key: ${key}`)
            .toHaveProperty(key);
        });
      }
    );

    test(
      'Get userMe - non-logged',
      { tag: ['@API', '@USERS', '@NON-LOGGED'] },
      async ({ request }) => {
        // Arrange
        const userRequest = new UserRequest(request);

        // Act
        const response = await userRequest.getUserMe();

        // Assert
        expect
          .soft(response.status(), 'Account should be not authorized')
          .toEqual(401);
      }
    );

    test(
      'Get userMe - logged',
      { tag: ['@API', '@USERS', '@LOGGED'] },
      async ({ userRequest }) => {
        // Act
        const response = await userRequest.getUserMe();

        // Assert
        expect
          .soft(response.status(), 'Account should be authorized')
          .toEqual(200);
      }
    );

    const usersData: LoginUserModelApi[] = [testUser1_Api, testUser2_Api];
    for (const user of usersData) {
      test(
        `Verify user "${user.username}" - role privileges`,
        { tag: ['@API', '@USERS', '@ROLES'] },
        async ({ apiClient }) => {
          // Arrange
          Logger.info(`Verify priviligies for user: ${user.username}`);
          const expectedKeys = ['id', 'firstName', 'lastName', 'age'];

          const userRequest = await apiClient(UserRequest, user);

          // Act
          const response = await userRequest.getAllUsers();
          const responseJson: { users: object[] } = await response.json();
          const users = responseJson.users;

          // Assert
          expectedKeys.forEach((key) => {
            expect
              .soft(users[0], `User should include key: ${key}`)
              .toHaveProperty(key);
          });
        }
      );
    }
  }
);
