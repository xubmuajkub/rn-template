import axios from 'axios';
import querystring from 'query-string';
import Config from 'react-native-config';

import {StorageKeys} from '@/constants';
import {AsyncStorageUtils} from '@/utils';

const HOST = Config.HOST;
const PORT = Config.PORT;

export const baseURL = `${HOST}${PORT !== '80' ? ':' + PORT : ''}`;
export const apiUrl = `${baseURL}/api`;

const instance = axios.create({
  baseURL: apiUrl,
  headers: {Accept: 'application/json'},
  paramsSerializer: (params: any) => querystring.stringify(params),
});

instance.interceptors.request.use(async config => {
  // console.log(JSON.stringify(config));
  const token = await AsyncStorageUtils.getData(StorageKeys.TOKEN);
  if (token) {
    if (config?.headers?.useRefreshToken) {
      const refreshToken = await AsyncStorageUtils.getData(
        StorageKeys.REFRESH_TOKEN,
      );
      // @ts-ignore
      config.headers['auth-token'] = refreshToken;
    } else {
      // @ts-ignore
      config.headers['auth-token'] = token;
    }
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  error => {
    // Handle errors
    // console.log(JSON.stringify(error));
    // if (
    //   error.response.data.status === 401 ||
    //   error.response.data.status === 403
    // ) {
    //   AsyncStorageUtils.clearStorage();
    //   // Todo: Remove current user info state
    // }
    // if (error.response && error.response.data) {
    //   throw error.response.data;
    // }
    throw error;
  },
);

export default instance;
