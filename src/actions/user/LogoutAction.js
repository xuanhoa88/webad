import httpClient from '../Http';

// Logout
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export function userLogout(params) {
  return {
    type: USER_LOGOUT,
    payload: httpClient.post('/api/logout?token=' + params.token),
  };
}
