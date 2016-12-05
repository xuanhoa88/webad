import httpClient from '../Http';

// Renew token
export const USER_RENEW_TOKEN = 'USER_RENEW_TOKEN';
export const USER_RENEW_TOKEN_SUCCESS = 'USER_RENEW_TOKEN_SUCCESS';
export const USER_RENEW_TOKEN_FAILURE = 'USER_RENEW_TOKEN_FAILURE';

export function userRenewToken(params) {
  return {
    type: USER_RENEW_TOKEN,
    payload: httpClient.get('/user/refresh', {
      params,
    }),
  };
}
