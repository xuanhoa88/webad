import httpClient from '../Http';

// Get all user cash out
export const FETCH_ALL_USER_CASH_OUT = 'FETCH_ALL_USER_CASH_OUT';
export const FETCH_ALL_USER_CASH_OUT_SUCCESS = 'FETCH_ALL_USER_CASH_OUT_SUCCESS';
export const FETCH_ALL_USER_CASH_OUT_FAILURE = 'FETCH_ALL_USER_CASH_OUT_FAILURE';

export function fetchAllUserCashOut(formData) {
  return {
    type: FETCH_ALL_USER_CASH_OUT,
    payload: httpClient.post('/api/payment/paypal/cash_out?token=' + formData.token, formData),
  };
}
