import httpClient from '../Http';

// Register
export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

//Register/login Facebook
export const USER_REGISTER_FACEBOOK = 'USER_REGISTER_FACEBOOK';
export const USER_REGISTER_FACEBOOK_SUCCESS = 'USER_REGISTER_FACEBOOK_SUCCESS';
export const USER_REGISTER_FACEBOOK_FAILURE = 'USER_REGISTER_FACEBOOK_FAILURE';

//Register/login Google
export const USER_REGISTER_GOOGLE = 'USER_REGISTER_GOOGLE';
export const USER_REGISTER_GOOGLE_SUCCESS = 'USER_REGISTER_GOOGLE_SUCCESS';
export const USER_REGISTER_GOOGLE_FAILURE = 'USER_REGISTER_GOOGLE_FAILURE';

export function userRegister(formValues) {
  return {
    type: USER_REGISTER,
    payload: httpClient.post('/api/register/member', formValues)
  };
}

export function registerFacebook(props) {
  return {
    type: USER_REGISTER_FACEBOOK,
    payload: httpClient.post('/api/login/facebook?facebook_token=' + props.facebook_token, props)
  };
}

export function registerGoogle(props) {
  return {
    type: USER_REGISTER_GOOGLE,
    payload: httpClient.post('/api/login/google?google_token=' + props.google_token, props)
  };
}
