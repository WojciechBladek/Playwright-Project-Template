import { BASE_API_URL } from '@_config/env.config';
import Logger from '@_logger/Logger';
import { stringifyJsonData } from '@_source/utils/json-handler.util';
import TestAgent from 'node_modules/@types/supertest/lib/agent';
import { Request, Response, agent as request } from 'supertest';

type RequestWithInternals = Request & {
  _data?: unknown;
  _formData?: unknown;
  header?: unknown;
};

export class BaseSuperTest {
  protected requestApi: TestAgent;
  private lastRequest?: RequestWithInternals;

  constructor(protected token?: string) {
    this.requestApi = request(BASE_API_URL);

    if (this.token) {
      this.requestApi.auth(this.token, { type: 'bearer' });
    }

    this.requestApi
      .on('request', (request: RequestWithInternals) => {
        this.lastRequest = request;

        Logger.info(`[METHOD:] "${request.method}" [URL:] "${request.url}"`);
      })
      .on('response', (response: Response) => {
        Logger.info(`[STATUS]: ${response.statusCode}`);

        if (response.statusCode >= 400) {
          Logger.error('🔥 API ERROR DETECTED');

          if (this.lastRequest) {
            Logger.warn(
              `[REQUEST_HEADERS:] ${stringifyJsonData(this.lastRequest.header)}`
            );

            if (this.lastRequest._data) {
              Logger.error(
                `[REQUEST_BODY:] ${stringifyJsonData(this.lastRequest._data)}`
              );
            } else if (this.lastRequest._formData) {
              Logger.error(
                `[REQUEST_FORM_DATA:] ${stringifyJsonData(
                  this.lastRequest._formData
                )}`
              );
            } else {
              Logger.error('[REQUEST_BODY:] empty');
            }
          }

          Logger.error(`[RESPONSE_BODY:] ${stringifyJsonData(response.body)}`);
          Logger.error(
            `[RESPONSE_HEADERS:] ${stringifyJsonData(response.headers)}`
          );
        }
      });
  }
}
