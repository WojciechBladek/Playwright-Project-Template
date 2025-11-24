import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from 'config/env.config';
import * as path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const STORAGE_STATE_PATH = path.join(__dirname, 'tmp/session.json');
export const API_TOKEN_PATH = path.join(__dirname, 'tmp/api-token.json');
export const RESPONSE_TIMEOUT = 10_000;

export const WAIT_FOR_TIMEOUT = 10_000;
export const WAIT_FOR_TIMEOUT_SHORT = 2_500;

export default defineConfig({
  testDir: './tests',
  // globalSetup: 'config/global.setup.ts',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'xml_test_report.xml' }],
    ['list']
  ],
  use: {
    baseURL: BASE_URL,
    video: 'retain-on-failure',
    screenshot: { mode: 'only-on-failure', fullPage: true },
    trace: 'retain-on-first-failure',
    actionTimeout: 5_000,
    locale: 'pl-PL',
    headless: true
  },
  projects: [
    {
      name: 'health',
      testMatch: '*.health.ts'
    },
    {
      name: 'api',
      dependencies: ['health'],
      testDir: 'tests/api'
    },
    {
      name: 'UI-Non-Logged',
      grepInvert: /@logged/,
      testDir: 'tests/UI',
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'setup',
      dependencies: ['health'],
      testMatch: '*.setup.ts'
    },
    {
      name: 'UI-Logged',
      grep: /@logged/,
      testDir: 'tests/UI',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE_PATH
      }
    },
    {
      name: 'E2E',
      grep: /@E2E/,
      testDir: 'tests/UI/end-to-end',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE_PATH
      }
    },
    {
      name: 'INTEGRATION',
      grep: /@INTEGRATION/,
      testDir: 'tests/UI/integration',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE_PATH,
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name: 'SMOKE',
      grep: /@SMOKE/,
      testDir: 'tests/UI/smoke',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE_PATH
      }
    }
  ]
});
