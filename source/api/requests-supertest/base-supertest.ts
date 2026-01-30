import { BASE_API_URL } from '@_config/env.config';
import Logger from '@_logger/Logger';
import { stringifyJsonData } from '@_source/utils/json-handler.util';
import TestAgent from 'node_modules/@types/supertest/lib/agent';
import { Request, Response, agent as request } from 'supertest';

export class BaseSuperTest {
  protected requestApi: TestAgent;
  constructor(protected token?: string) {
    this.requestApi = request(BASE_API_URL);

    if (this.token) {
      this.requestApi.auth(this.token, { type: 'bearer' });
    }

    this.requestApi
      .on('request', (request: Request) => {
        Logger.info(`[METHOD:] "${request.method}" [URL:] "${request.url}"`);
      })
      .on('response', (response: Response) => {
        if (response.statusCode < 400) {
          Logger.info(`STATUS: ${stringifyJsonData(response.status)}`);
          if (!response.body.accessToken) {
            Logger.info(`BODY: ${stringifyJsonData(response.body)}`);
          }
        }
        if (response.statusCode >= 400) {
          Logger.error(`HEADERS: ${stringifyJsonData(response.headers)}`);
          Logger.error(`STATUS: ${stringifyJsonData(response.status)}`);
          Logger.error(`BODY: ${stringifyJsonData(response.body)}`);
        }
      });
  }
}
