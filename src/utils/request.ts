import Api from '@/services/STM-APIs';
import jwtDecode from 'jwt-decode';
import type { RequestInterceptor, ResponseError, ResponseInterceptor } from 'umi-request';
import Reqs, { extend } from 'umi-request';
import { openNotification } from './helpers/openNotification';

let isRefreshing = false;
let _cacheRequest: {
  reject: (value: unknown) => void;
  resolve: (reason?: any) => void;
}[] = [];

const processQueue = (error: unknown) => {
  _cacheRequest.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  _cacheRequest = [];
};

const codeMessage = {
  400: 'There was an error in the request sent, and the server did not create or modify data. ',
  401: 'Session not valid anymore. You should to login again',
  403: 'The user is authorized, but access is forbidden. ',
  404: 'The request is for a record that does not exist, and the server is not operating. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource has been permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'An error occurred in the server, please check the server. ',
  502: 'Gateway error. ',
  503: 'The service is unavailable, the server is temporarily overloaded or maintained. ',
  504: 'The gateway has timed out. ',
};

let token = localStorage.getItem('accessToken');
const { cancel } = Reqs.CancelToken.source();

const errorHandler = async (error: ResponseError) => {
  if (Reqs.isCancel(error)) return;

  const { response, data } = error;
  const status: keyof typeof codeMessage = data?.status >= 400 ? data?.status : response?.status;
  if (status >= 400) {
    const errorText = codeMessage[status] || response.statusText;
    openNotification('error', `Request error ${status}`, errorText);
  } else if (!response) {
    openNotification(
      'error',
      'Network anomaly',
      'Your network is abnormal and you cannot connect to the server',
    );
  }

  throw error;
};

export const request = extend({
  prefix: `${API_ENDPOINT}`,
  requestType: 'json',
  timeout: 3000,
  timeoutMessage: 'Server không phản hồi trong khoảng thời gian dài',
  errorHandler,
});

const onRefresh = async () => {
  isRefreshing = true;
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken || refreshToken === '') throw new Error('Refresh token is empty ');

  const refreshTokenDecoded: { exp: number } = jwtDecode(refreshToken);
  if (!refreshTokenDecoded.exp || refreshTokenDecoded.exp - Date.now() / 1000 <= 0)
    throw new Error('Refresh token was expired');

  const response = await Api.AuthController.refreshToken({ refreshToken });

  if (!response || !response.data) throw Error('Request invalid');
  if (!response.data?.token) throw Error('Access token is undefined');
  if (!response.data.refreshToken) throw Error('Refresh token is undefined');

  token = response.data?.token;
  processQueue(null);
  localStorage.setItem('accessToken', response.data?.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  isRefreshing = false;
};

const requestInterceptor: RequestInterceptor = (url, options) => {
  const headers: { Authorization?: string } = {};
  if (!token) {
    token = localStorage.getItem('accessToken');
  }
  if (
    token &&
    !url.includes('login') &&
    !url.includes('refresh-token') &&
    !url.includes('utility')
  ) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { url, options: { ...options, headers } };
};

const responseInterceptor: ResponseInterceptor = async (response, options) => {
  const { status, url } = response;

  if (status === 401 && !url.includes('refresh-token')) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        _cacheRequest.push({ resolve, reject });
      })
        .then(() => {
          return request(options.url, { ...options });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
    try {
      await onRefresh();
      return request(options.url, { ...options });
    } catch (err) {
      console.warn(err);
      _cacheRequest = [];
      token = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      cancel('Session is invalid');
      processQueue(err);
      isRefreshing = false;
      const error: ResponseError = {
        data: response.body,
        response,
        request: { url: response.url, options },
        message: 'Session is invalid',
        name: 'Session is invalid',
        type: 'Session is invalid',
      };
      throw error;
    }
  }

  const body = await response.clone().json();

  if (response.status >= 400 || body.status >= 400) {
    const error: ResponseError = {
      response,
      data: response.body,
      request: { options, url: response.url },
      message: '',
      name: '',
      type: '',
    };
    throw error;
  }

  if (url.includes('login')) {
    const { data } = body;
    if (data?.token && data?.refreshToken) {
      localStorage.setItem('accessToken', data?.token);
      localStorage.setItem('refreshToken', data?.refreshToken);
    }
  }

  if (url.includes('logout')) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  return { ...body };
};

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor);
