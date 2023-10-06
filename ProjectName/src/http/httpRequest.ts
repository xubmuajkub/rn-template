import {Dispatch} from '@reduxjs/toolkit';
import {AxiosRequestHeaders, AxiosResponse, Method} from 'axios';
import i18next from 'i18next';

import {ToastTypes} from '@/constants';
import {axiosClient} from '@/http';
import {setToast} from '@/store/slices/app';
import {setAuthInfo} from '@/store/slices/auth';
import {GlobalState, HttpResponse} from '@/types';
import {AsyncStorageUtils, toCamelCaseKey} from '@/utils';

const t = i18next.t;

interface AsyncThunkConfig {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
  getState?: () => GlobalState;
}

interface Request {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | Method;
  params?: object;
  data?: object;
  thunkApi: AsyncThunkConfig;
  successMessage?: string;
  disabledErrorMessage?: boolean;
  returnError?: boolean;
  headers?: AxiosRequestHeaders;
  onUploadProgress?: (progressEvent: any) => void;
}

const handleSuccess = (
  response: AxiosResponse,
  successMessage: string | undefined,
  thunkApi: AsyncThunkConfig,
) => {
  const {method, url} = response.config;
  console.log('==========================================================');
  console.log(
    `[RESPONSE] ${method?.toUpperCase()}: ${url}\n`,
    JSON.stringify(toCamelCaseKey(response.data)),
  );
  console.log('==========================================================');

  successMessage &&
    thunkApi?.dispatch?.(
      setToast({
        message: t(successMessage),
        options: {
          type: ToastTypes.SUCCESS,
        },
      }),
    );
  return toCamelCaseKey(response.data);
};

// const loading = (dispatch: any, state: boolean) => {
//   const loadingMore = store.getState().app.loadingMore;
//   // console.log('loadingMore', loadingMore);
//   !loadingMore && dispatch(setLoading(state));
//   // console.log('loading', store.getState().app.loading);
// };

const UNAUTHORIZED = 'Unauthorized or Access Token is expired';

const handleError = (
  errorResponse: any,
  thunkApi: AsyncThunkConfig,
  disabledErrorMessage: boolean,
  returnError: boolean,
) => {
  console.log('==========================================================');
  console.log('[ERROR]', JSON.stringify(errorResponse));
  console.log('==========================================================');

  let message = errorResponse?.data;
  if (!message) {
    message = errorResponse?.message;
  } else {
    try {
      message = JSON.parse(message);
      if (
        typeof message !== 'string' &&
        typeof message === 'object' &&
        message?.hasOwnProperty('ko')
      ) {
        message = message.ko;
      }
    } catch (e) {}
  }

  if (!disabledErrorMessage && message !== UNAUTHORIZED) {
    thunkApi?.dispatch?.(
      setToast({
        // message: t(`error.${errorResponse?.status || 'unknown'}`),
        message,
        options: {
          type: ToastTypes.ERROR,
        },
      }),
    );
  }

  // loading(dispatch, false);
  if (returnError) {
    return errorResponse;
  }
};

const httpRequest = async <T = any>({
  url,
  method,
  params,
  data,
  thunkApi,
  successMessage,
  disabledErrorMessage = false,
  headers,
  returnError = false,
  onUploadProgress,
  ...rest
}: Request): Promise<HttpResponse<T>> => {
  // loading(dispatch, true);
  try {
    console.log('==========================================================');
    console.log('[REQUEST]', `${method}: ${url}`);
    console.log('params: ', params);
    console.log('data: ', data);
    console.log('==========================================================');
    const response = await axiosClient.request<any, AxiosResponse>({
      url,
      method,
      params,
      data,
      headers,
      onUploadProgress,
      ...rest,
    });
    // loading(dispatch, false);
    return handleSuccess(response, successMessage, thunkApi) as HttpResponse<T>;
  } catch (error: any) {
    const errorResponse = error?.response?.data;
    const originalRequest = error?.config;
    // console.log(JSON.stringify(errorResponse), url);
    console.log('ERROR_URL:', url);
    // console.log('REQUEST_ERROR:', errorResponse.message);
    // console.log('REQUEST_ERROR:', JSON.stringify(errorResponse.data));
    // Restore expired token
    if (
      errorResponse?.status === 401 &&
      errorResponse?.message === UNAUTHORIZED
    ) {
      //   const {payload} = await dispatch(reduceRenewToken());
      //   if (payload && payload.status === HttpStatusCode.Ok) {
      //     // Request again
      //     try {
      //       const response = await axiosClient.request<any, AxiosResponse>(
      //         originalRequest,
      //       );
      //       // loading(dispatch, false);
      //       return handleSuccess(response, successMessage, dispatch);
      //     } catch (_error: any) {
      //       return handleError(
      //         errorResponse ?? _error,
      //         dispatch,
      //         disabledErrorMessage,
      //         returnError,
      //       );
      //     }
      //   } else {
      // Clear session when refresh token expired
      await AsyncStorageUtils.clearStorage();
      thunkApi?.dispatch?.(setAuthInfo(null));
      //   }
    }
    return handleError(
      errorResponse ?? error,
      thunkApi,
      disabledErrorMessage,
      returnError,
    );
  }
};

export default httpRequest;
