import { eventListener } from '@_source/UI/fixtures/event-listener.fixture.js';
import { pageObjectTest } from '@_source/UI/fixtures/page-object.fixture.js';
import { pageObjectSetStorageState } from '@_source/UI/fixtures/page-set-storage-state.fixture.js';
import { apiClientTest } from '@_source/api/fixtures/api-client.fixture.js';
import { requestObjectTest } from '@_source/api/fixtures/request-object.fixture.js';
import { requestBaseObjectTest } from '@_source/api/fixtures/request.fixture.js';
import { mergeTests } from 'playwright/test';

export { expect } from '@playwright/test';

export const test = mergeTests(
  requestObjectTest,
  apiClientTest,
  eventListener,
  pageObjectTest,
  pageObjectSetStorageState,
  requestBaseObjectTest
);
