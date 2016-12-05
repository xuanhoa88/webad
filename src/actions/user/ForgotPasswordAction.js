import httpClient from '../Http';

/**
 * Constants
 */
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export function resetPassword(formValues) {
  return {
    type: RESET_PASSWORD,
    payload: httpClient.post('/api/users/reset_password', formValues)
  };
}
