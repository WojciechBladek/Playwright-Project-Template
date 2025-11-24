import { eventListener } from '@_source/UI/fixtures/event-listener.fixture';
import { pageObjectTest } from '@_source/UI/fixtures/page-object.fixture';
import { pageObjectSetStorageState } from '@_source/UI/fixtures/page-set-storage-state.fixture';
import { apiClientTest } from '@_source/api/fixtures/api-client.fixture';
import { requestObjectTest } from '@_source/api/fixtures/request-object.fixture';
import { mergeTests } from 'playwright/test';

export { expect } from '@playwright/test';

export const test = mergeTests(
  requestObjectTest,
  apiClientTest,
  eventListener,
  pageObjectTest,
  pageObjectSetStorageState
);
