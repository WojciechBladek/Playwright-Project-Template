import { apiClientTest } from '@_api_source/fixtures/api-client.fixture.js';
import { requestObjectTest } from '@_api_source/fixtures/request-object.fixture.js';
import { requestBaseUrlTest } from '@_api_source/fixtures/request.fixture.js';
import { eventListener } from '@_ui_source/fixtures/event-listener.fixture.js';
import { pageObjectTest } from '@_ui_source/fixtures/page-object.fixture.js';
import { pageObjectSetStorageState } from '@_ui_source/fixtures/page-set-storage-state.fixture.js';
import { mergeTests } from 'playwright/test';

export { expect } from '@playwright/test';

export const test = mergeTests(
  requestObjectTest,
  apiClientTest,
  eventListener,
  pageObjectTest,
  pageObjectSetStorageState,
  requestBaseUrlTest
);
