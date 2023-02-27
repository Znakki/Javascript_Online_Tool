import { describe, expect, test } from '@jest/globals';
import { BASE_URL, ENDPOINTS, getQueryParams, requiredParam } from '../utils/utils.js';
import { getRequest, request } from '../utils/requestBuilder.js';

const endpoint = ENDPOINTS.UNIX_TIMESTAMP_CONVERTER;

//Invalid Date String
describe('Invalid Date String', () => {
  test('Converting incorrect value to Date String', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: 'invalid-date', ...requiredParam });
    const response = await getRequest(url);
    expect(response).toBe(false);
  });

  test('Converting  unsupported format of Date String throws error', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: '17/02/2009 GMT', ...requiredParam });
    const response = await getRequest(url);
    expect(response).toBe(false);
  });

  test('Converting large Date String throws error', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: '10000-01-01%202:3:22', ...requiredParam });
    const response = await getRequest(url);
    expect(response).toBe(false);
  });

  test('Converting Empty input: s=  of Date String throws error', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: '', ...requiredParam });
    const response = await getRequest(url);
    expect(response).toBe(false);
  });

  test('Converting Date without cached query param throws error 404', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: '599' });
    let response;
    try {
      await request(url);
    } catch (error) {
      response = error.response;
    }
    expect(response.status).toBe(404);
    expect(response.statusText).toEqual('Not Found');
  });
});
