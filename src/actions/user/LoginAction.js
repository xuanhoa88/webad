import httpClient from '../Http';

// Login
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export function userLogin(formValues) {
  return {
    type: USER_LOGIN,
    payload: httpClient.post('/api/login', formValues)
  };
}
