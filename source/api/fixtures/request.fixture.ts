import { BASE_API_URL } from '@_config/env.config.js';
import { test as baseTest, request as newRequest } from '@playwright/test';

export const requestBaseObjectTest = baseTest.extend({
  request: async ({}, use) => {
    const request = await newRequest.newContext({ baseURL: BASE_API_URL });

    await use(request);
  }
});
