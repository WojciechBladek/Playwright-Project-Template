import { stringifyJsonData } from '@_common_source/utils/json-files.util.js';
import Logger from '@_logger/Logger.js';
import { APIResponse } from '@playwright/test';

export async function apiErrorHandler(
  response: APIResponse,
  options: { customMessage?: string; payload?: object } = {}
): Promise<void> {
  if (!response.ok()) {
    Logger.error('🔥 API ERROR DETECTED');
    let responseBody: string;

    try {
      const responseJson = await response.json();
      responseBody = stringifyJsonData(responseJson);
    } catch {
      const responseText = await response.text();
      responseBody = stringifyJsonData(responseText);
    }

    if (options.payload) {
      Logger.info(`[PAYLOAD]: ${stringifyJsonData(options.payload)}`);
    }
    Logger.error(
      `${options.customMessage || 'Api request failed'}, 
      [URL]: ${response.url()}
      [STATUS CODE]: ${response?.status()},
      [RESPONSE_BODY]: ${responseBody}
      [HEADERS]: ${stringifyJsonData(response.headersArray())}`
    );
  }
}

export async function apiThrowErrorHandler(
  response: APIResponse,
  options: { customMessage?: string; payload?: object } = {}
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

    if (options.payload) {
      Logger.info(`[PAYLOAD]: ${stringifyJsonData(options.payload)}`);
    }
    throw new Error(
      `${options.customMessage || 'Api request failed'}, 
      [URL]: ${response.url()}
      [STATUS CODE]: ${response?.status()},
      [RESPONSE_BODY]: ${responseBody}`
    );
  }
}
