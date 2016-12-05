import httpClient from '../Http';

// Get all user transaction histories
export const FETCH_ALL_USER_TRANSACTION_HISTORY = 'FETCH_ALL_USER_TRANSACTION_HISTORY';
export const FETCH_ALL_USER_TRANSACTION_HISTORY_SUCCESS = 'FETCH_ALL_USER_TRANSACTION_HISTORY_SUCCESS';
export const FETCH_ALL_USER_TRANSACTION_HISTORY_FAILURE = 'FETCH_ALL_USER_TRANSACTION_HISTORY_FAILURE';

export function fetchAllUserTransactionHistory(params) {
  return {
    type: FETCH_ALL_USER_TRANSACTION_HISTORY,
    payload: httpClient.get('/api/users/transactions', {
      params,
    })
  };
}
