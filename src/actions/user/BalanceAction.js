import httpClient from '../Http';

// Get all user balance
export const FETCH_ALL_USER_BALANCE = 'FETCH_ALL_USER_BALANCE';
export const FETCH_ALL_USER_BALANCE_SUCCESS = 'FETCH_ALL_USER_BALANCE_SUCCESS';
export const FETCH_ALL_USER_BALANCE_FAILURE = 'FETCH_ALL_USER_BALANCE_FAILURE';

export function fetchAllUserBalance(params) {
  return {
    type: FETCH_ALL_USER_BALANCE,
    payload: httpClient.get('/api/users/balance', {
      params,
    })
  };
}
