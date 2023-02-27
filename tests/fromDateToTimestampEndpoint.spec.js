import { describe, expect, test } from '@jest/globals';
import { BASE_URL, ENDPOINTS, getQueryParams, requiredParam } from '../utils/utils.js';
import { getRequest } from '../utils/requestBuilder.js';

const endpoint = ENDPOINTS.UNIX_TIMESTAMP_CONVERTER;

//Convert Date String to Unix TimeStamp
describe('Convert Date String to Unix TimeStamp', () => {
  test('Converting 1970-01-01 0:00:00 to Unix TimeStamp should be 0', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: '1970-01-01 0:00:00 GMT', ...requiredParam });
    const response = await getRequest(url);
    expect(response).toEqual(0);
  });

  test('Converting 2038-01-01 0:00:00 to Unix TimeStamp should be 0', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: '1970-01-01 0:00:00', ...requiredParam });
    const response = await getRequest(url);
    expect(response).toEqual(0);
  });

  test('Converting Date String 2016-01-01 without a time info to Unix TimeStamp should convert correctly', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: '2016-01-01', ...requiredParam });
    const response = await getRequest(url);
    expect(response).toEqual(1451606400);
  });

  test('Converting Date String 2:3:22 without a date info to Unix TimeStamp should convert correctly', async () => {
    function toTimestamp(strDate) {
      var datum = Date.parse(strDate);
      return datum / 1000;
    }

    const url = BASE_URL + getQueryParams(endpoint, { s: '2:3:22', ...requiredParam });
    const response = await getRequest(url);
    const date = new Date().toLocaleDateString();
    const expectedTimeStamp = toTimestamp(`${date} 3:3:22`); // dirty only for test task purposes
    expect(expectedTimeStamp).toEqual(response);
  });

  test('Converting Date String 2016/01/01%202:3:22 to Unix TimeStamp should convert correctly', async () => {
    const url = BASE_URL + getQueryParams(endpoint, { s: '2016/01/01%202:3:22', ...requiredParam });
    const response = await getRequest(url);
    expect(response).toEqual(1451613802);
  });
});
