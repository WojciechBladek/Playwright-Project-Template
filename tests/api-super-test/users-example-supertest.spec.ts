import { UserRequestSuperTest } from '@_api_source/requests-supertest/user-supertest.request.js';
import { getTokenSuperTest } from '@_api_source/utils/generate-token-supertest.util.js';
import { expect, test } from '@_merge_fixtures_source';

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
      { tag: ['@API-SUPER-TEST', '@USERS', '@NON-LOGGED'] },
      async () => {
        // Arrange
        const userRequest = new UserRequestSuperTest();
        const expectedNotEmptyBody = 1;
        const expectedKeys = ['id', 'firstName', 'lastName', 'age'];

        // Act

        const response = await userRequest.getAllUsers();
        const users: object[] = response.body.users;

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
      { tag: ['@API-SUPER-TEST', '@USERS', '@NON-LOGGED'] },
      async () => {
        // Arrange
        const userRequest = new UserRequestSuperTest();

        // Act
        const response = await userRequest.getUserMe();

        // Assert
        expect
          .soft(401, 'Account should be not authorized')
          .toEqual(response.statusCode);
      }
    );

    test(
      'Get userMe - logged',
      { tag: ['@API-SUPER-TEST', '@USERS', '@LOGGED'] },
      async () => {
        // Arrange
        const userRequest = new UserRequestSuperTest(await getTokenSuperTest());

        // Act
        const response = await userRequest.getUserMe();

        // Assert
        expect
          .soft(200, 'Account should be authorized')
          .toEqual(response.statusCode);
      }
    );
  }
);
