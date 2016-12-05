import httpClient from '../Http';

// Share on facebook
export const SHARE_ON_FACEBOOK = 'SHARE_ON_FACEBOOK';
export const SHARE_ON_FACEBOOK_SUCCESS = 'SHARE_ON_FACEBOOK_SUCCESS';
export const SHARE_ON_FACEBOOK_FAILURE = 'SHARE_ON_FACEBOOK_FAILURE';
export const RESET_SHARE_ON_FACEBOOK = 'RESET_SHARE_ON_FACEBOOK';

export function shareOnFacebook(props) {
  return {
    type: SHARE_ON_FACEBOOK,
    payload: httpClient.post('/activity/share', props)
  };
}
