import axios from 'axios';

export const request = async (url) => await axios(url);

export const getRequest = async (url) => {
  const response = await axios.get(url).catch(function (error) {
    throw Error(error);
  });

  return response.data;
};
