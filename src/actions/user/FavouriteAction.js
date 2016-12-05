import httpClient from '../Http';

/**
 * Constants
 */
export const FETCH_ALL_USER_FAVOURITE = 'FETCH_ALL_USER_FAVOURITE';
export const FETCH_ALL_USER_FAVOURITE_SUCCESS = 'FETCH_ALL_USER_FAVOURITE_SUCCESS';
export const FETCH_ALL_USER_FAVOURITE_FAILURE = 'FETCH_ALL_USER_FAVOURITE_FAILURE';

export function fetchAllUserFavoutites(params) {
  return {
    type: FETCH_ALL_USER_FAVOURITE,
    payload: httpClient.get('/api/member/adv/favorites', {
      params,
    }),
  }
}
