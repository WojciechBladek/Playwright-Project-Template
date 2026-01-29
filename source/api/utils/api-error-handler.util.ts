import Logger from '@_logger/Logger';
import { stringifyJsonData } from '@_source/utils/json-handler.util';
import { APIResponse } from '@playwright/test';

export async function apiErrorHandler(
  response: APIResponse,
  customMessage?: string
): Promise<void> {
  if (!response.ok()) {
    let responseBody: string;

    try {
      const responseJson = await response.json();
      responseBody = stringifyJsonData(responseJson);
    } catch {
      const responseText = await response.text();
      responseBody = stringifyJsonData(responseText);
    }

    Logger.error(
      `${customMessage || 'Api request failed'}, 
      [URL]: ${response.url()}
      [STATUS CODE]: ${response?.status()},
      [RESPONSE_BODY]: ${responseBody}
      [HEADERS]: ${stringifyJsonData(response.headersArray())}`
    );
  }
}

export async function apiThrowErrorHandler(
  response: APIResponse,
  customMessage?: string
): Promise<void> {
  if (!response.ok()) {
    let responseBody: string;

    try {
      const responseJson = await response.json();
      responseBody = stringifyJsonData(responseJson);
    } catch {
      const responseText = await response.text();
      responseBody = stringifyJsonData(responseText);
    }

    throw new Error(
      `${customMessage || 'Api request failed'}, 
      [URL]: ${response.url()}
      [STATUS CODE]: ${response?.status()},
      [RESPONSE_BODY]: ${responseBody}`
    );
  }
}
