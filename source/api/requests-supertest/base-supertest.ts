/* eslint-disable no-console */
import { BASE_API_URL } from '@_config/env.config';
import Logger from '@_logger/Logger';
import { RequestHeaders } from '@_source/api/models/headers.api.model';
import TestAgent from 'node_modules/@types/supertest/lib/agent';
import { Response, default as request } from 'supertest';

interface SuperTestCRUD {
  endpoint: string;
  headers?: RequestHeaders[];
  payload?: object | string;
}

export class BaseSuperTest {
  protected url: string;
  protected requestApi: TestAgent;
  constructor(
    protected token?: string,
    protected baseUrl?: string
  ) {
    this.url = this.baseUrl || BASE_API_URL;
    this.requestApi = request(this.url);
  }

  protected async get({ endpoint, headers }: SuperTestCRUD): Promise<Response> {
    const req = this.requestApi.get(endpoint);

    if (this.token) {
      req.auth(this.token, { type: 'bearer' });
    }

    if (headers) {
      headers.forEach((headerObj) => {
        Object.entries(headerObj).forEach(([key, value]) => {
          req.set(key, value);
        });
      });
    }

    req
      .on('request', (request) => {
        Logger.info(`[METHOD:] "${request.method}" [URL:] "${request.url}"`);
      })
      .on('response', (response: Response) => {
        if (response.statusCode >= 400) {
          console.log('HEADERS: ', response.headers);
          console.log('STATUS: ', response.status);
          console.log('BODY: ', response.body);
        }
      });

    return await req;
  }

  protected async post({
    endpoint,
    headers,
    payload
  }: SuperTestCRUD): Promise<Response> {
    const req = this.requestApi.post(endpoint);

    if (this.token) {
      req.auth(this.token, { type: 'bearer' });
    }

    if (payload) {
      req.send(payload);
    }

    if (headers) {
      headers.forEach((headerObj) => {
        Object.entries(headerObj).forEach(([key, value]) => {
          req.set(key, value);
        });
      });
    }

    req
      .on('request', (request) => {
        Logger.info(`[METHOD:] "${request.method}" [URL:] "${request.url}"`);
      })
      .on('response', (response: Response) => {
        if (response.statusCode >= 400) {
          console.log('HEADERS: ', response.headers);
          console.log('STATUS: ', response.status);
          console.log('BODY: ', response.body);
          if (payload) {
            console.log('Payload: ', payload);
          }
        }
      });

    return await req;
  }
}
