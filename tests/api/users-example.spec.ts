import Logger from '@_logger/Logger';
import { LoginModelUi } from '@_source/UI/models/user.model';
import { UserRequest } from '@_source/api/requests/user.request';
import { testUser1_Api, testUser2_Api } from '@_source/api/test-data/user.data';
import { expect, test } from '@_source/merge.fixture';

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
      { tag: ['@API', '@USERS'] },
      async ({ userRequest }) => {
        // Arrange
        userRequest.token = undefined; //* set headers as undefined to simulate not being logged in

        // Act
        const response = await userRequest.getUserMe();

        // Assert
        await expect
          .soft(response, 'Account should be not authorized')
          .not.toBeOK();
      }
    );

    const usersData: LoginModelUi[] = [testUser1_Api, testUser2_Api];
    for (const user of usersData) {
      test(
        `Verify user "${user.userEmail}" - role privileges`,
        { tag: ['@API', '@USERS', '@ROLES'] },
        async ({ apiClient }) => {
          // Arrange
          Logger.info(`Verify priviligies for user: ${user.userEmail}`);
          const expectedKeys = ['id', 'firstName', 'lastName', 'age'];

          const userRequest = await apiClient<UserRequest>(user, UserRequest);

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
