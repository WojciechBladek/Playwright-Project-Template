import { API_TOKEN_PATH } from '@_pw-config';
import { RequestHeaders } from '@_source/api/models/headers.api.model';
import * as fs from 'fs';

/*
Use this module if you capture
a token when logging
in to the UI and 
want to use the same token in API tests.
*/

export function loginDataFile(path: string): string {
  try {
    const rawData = fs.readFileSync(path, { encoding: 'utf8' });
    return rawData;
  } catch {
    throw new Error(`Not found path: ${path}`);
  }
}

/**
 * @param path path to file token storage example path -> playwright.config.ts
 * @returns
 */
export function GET_API_TOKEN(path: string): string | undefined {
  const accessToken = loginDataFile(path);

  return accessToken ? `Bearer ${accessToken}` : undefined;
}

// Example of use in source/api/fixtures/request-object.fixture.ts
export const getApiTokenFromFile = {
  get AuthorizationHeader(): RequestHeaders {
    return { Authorization: GET_API_TOKEN(API_TOKEN_PATH) };
  }
};
