// export const prepareQueryParams = (data) => { return  }

import qs from 'qs';

export const BASE_URL = 'https://helloacm.com/api';

export const ENDPOINTS = {
  UNIX_TIMESTAMP_CONVERTER: '/unix-timestamp-converter/',
};

export const getQueryParams = (endpoint, paramObject) => {
  const res = qs.stringify(paramObject, { addQueryPrefix: true, encode: false });
  return endpoint + res;
};

export const requiredParam = { cached: true };
