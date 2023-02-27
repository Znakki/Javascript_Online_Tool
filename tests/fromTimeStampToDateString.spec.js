import { describe, expect, test } from '@jest/globals';
import { BASE_URL, ENDPOINTS, getQueryParams, requiredParam } from '../utils/utils.js';
import { getRequest } from '../utils/requestBuilder.js';

const endpoint = ENDPOINTS.UNIX_TIMESTAMP_CONVERTER;

//Convert Unix TimeStamp to Date String
describe('Convert Date String to Unix TimeStamp', () => {
  test('Converting Unix TimeStamp 0 to Date String  should be 1970-01-01 00:00:00', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: 0, ...requiredParam });
    const response = await getRequest(url);
    expect(response).toEqual('1970-01-01 12:00:00');
  });

  test('Converting Unix TimeStamp 1 to Date String  should be 1970-01-01 1:0:01', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: 1, ...requiredParam });
    const response = await getRequest(url);
    expect(response).toEqual('1970-01-01 12:00:01');
  });

  test('Converting Unix TimeStamp 1431089149 to Date String should be 2015-05-08 12:45:49', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: 1431089149, ...requiredParam });
    const response = await getRequest(url);
    expect(response).toEqual('2015-05-08 12:45:49');
  });
});
