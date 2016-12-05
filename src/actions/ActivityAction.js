import httpClient from './Http';

// Share
export const SHARE_ON_SOCIAL_NETWORK = 'SHARE_ON_SOCIAL_NETWORK';
export const SHARE_ON_SOCIAL_NETWORK_SUCCESS = 'SHARE_ON_SOCIAL_NETWORK_SUCCESS';
export const SHARE_ON_SOCIAL_NETWORK_FAILURE = 'SHARE_ON_SOCIAL_NETWORK_FAILURE';
export const RESET_SHARE_ON_SOCIAL_NETWORK = 'RESET_SHARE_ON_SOCIAL_NETWORK';

//Get countdown share
export const GET_COUNTDOWN_SHARE = 'GET_COUNTDOWN_SHARE';
export const GET_COUNTDOWN_SHARE_SUCCESS = 'GET_COUNTDOWN_SHARE_SUCCESS';
export const GET_COUNTDOWN_SHARE_FAILURE = 'GET_COUNTDOWN_SHARE_FAILURE';

export function shareOnSocialNetwok(props) {
  return {
    type: SHARE_ON_SOCIAL_NETWORK,
    payload: httpClient.post('/api/member/adv/' + props.advertisement_id + '/post_activity?token=' + props.token, props)
  };
};

export function getCountdownShare(params) {
  return {
    type: GET_COUNTDOWN_SHARE,
    payload: httpClient.get('/api/member/adv/' + params.advertisement_id + '/countdownShare', {
      params
    })
  }
}
