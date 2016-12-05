import httpClient from '../Http';

// Get all user reward histories
export const FETCH_ALL_USER_REWARD_HISTORY = 'FETCH_ALL_USER_REWARD_HISTORY';
export const FETCH_ALL_USER_REWARD_HISTORY_SUCCESS = 'FETCH_ALL_USER_REWARD_HISTORY_SUCCESS';
export const FETCH_ALL_USER_REWARD_HISTORY_FAILURE = 'FETCH_ALL_USER_REWARD_HISTORY_FAILURE';
export const RESET_FETCH_ALL_USER_REWARD_HISTORY = 'RESET_FETCH_ALL_USER_REWARD_HISTORY';

export function fetchAllUserRewardHistory(params) {
  return {
    type: FETCH_ALL_USER_REWARD_HISTORY,
    payload: httpClient.get('/api/users/rewards', {
      params,
    })
  };
}
