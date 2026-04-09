import { BASE_API_URL } from '@_config/env.config.js';
import { API_TOKEN_PATH } from '@_pw-config';
import { APIRequestContext, request as newRequest } from '@playwright/test';
import { readFileSync } from 'fs';

/*
Use this module if you capture
a token when logging
in to the UI and 
want to use the same token in API tests.
*/

function readTokenFile(path: string): string {
  try {
    return readFileSync(path, { encoding: 'utf8' });
  } catch {
    throw new Error(`Not found path: ${path}`);
  }
}

export function getApiBearerToken(path: string): string | undefined {
  const accessToken = readTokenFile(path);

  return accessToken ? `Bearer ${accessToken}` : undefined;
}

// Example of use in source/api/fixtures/request-object.fixture.ts
export async function getAuthorizedRequestFromFile(): Promise<APIRequestContext> {
  const token = getApiBearerToken(API_TOKEN_PATH);

  if (!token) {
    throw new Error('Token was not generated, checkout file with token');
  }

  return newRequest.newContext({
    baseURL: BASE_API_URL,
    extraHTTPHeaders: {
      Authorization: token
    }
  });
}
