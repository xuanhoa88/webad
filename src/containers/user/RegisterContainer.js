import {
  reduxForm
} from 'redux-form';

import {
  Authentication
} from '../../libraries/Authentication';
import {
  Validator
} from '../../components/ui/form';
import UserRegisterComponent from '../../components/user/RegisterComponent';
import {
  userRegister,
  registerFacebook,
  registerGoogle,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_FACEBOOK_SUCCESS,
  USER_REGISTER_FACEBOOK_FAILURE,
  USER_REGISTER_GOOGLE_SUCCESS,
  USER_REGISTER_GOOGLE_FAILURE
} from '../../actions/user/RegisterAction';

// Client side validation
const validate = (data) => {
  let vv = Validator.make({
    data,
    rules: {
      email: 'required|email',
      password: 'required|min:6',
      confirmPassword: 'required|min:6|identical:password',
    },
    names: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
    }
  });

  let hasErrors, errors;
  if (hasErrors = vv.fails()) {
    errors = vv.firstErrors;
  }

  return hasErrors && errors;
};

const mapDispatchToProps = (dispatch) => {
  return {
    userRegisterAPI: (formData, dispatch) => {

      // Recreate params
      formData.password_confirmation = formData.confirmPassword;
      delete formData.confirmPassword;

      return new Promise((resolve, reject) => {
        dispatch(userRegister(formData)).then((response) => {
          let data = response.payload.data;

          // if any one of these exist, then there is a field error
          if (!data.status) {
            // let other components know of error by updating the redux` state
            dispatch({
              type: USER_REGISTER_FAILURE,
              payload: response.payload,
              message: USER_REGISTER_FAILURE,
            });

            Authentication.removeToken();

            reject(data); // this is for redux-form itself
          } else {
            // store JWT Token to browser session storage
            // If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
            // sessionStorage = persisted only in current tab
            Authentication.setToken(data.data.token);

            //let other components know that we got user and things are fine by updating the redux` state
            dispatch({
              type: USER_REGISTER_SUCCESS,
              payload: response.payload,
              message: USER_REGISTER_SUCCESS,
            });

            resolve(data); //this is for redux-form itself
          }
        });
      });
    },
    /**
     * Register facebook
     */
    registerFacebook: (params) => new Promise((resolve, reject) => dispatch(registerFacebook(params)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: USER_REGISTER_FACEBOOK_SUCCESS,
        message: data.message || USER_REGISTER_FACEBOOK_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = USER_REGISTER_FACEBOOK_FAILURE;
        status.message = data.message || USER_REGISTER_FACEBOOK_FAILURE;
        Authentication.removeToken();
      } else {
        Authentication.setToken(data.data.token);
      }

      dispatch(status);
      resolve(data);
    })),

    /**
     * Register google
     */
    registerGoogle: (params) => new Promise((resolve, reject) => dispatch(registerGoogle(params)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: USER_REGISTER_GOOGLE_SUCCESS,
        message: data.message || USER_REGISTER_GOOGLE_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = USER_REGISTER_GOOGLE_FAILURE;
        status.message = data.message || USER_REGISTER_GOOGLE_FAILURE;
        Authentication.removeToken();
      } else {
        Authentication.setToken(data.data.token);
      }

      dispatch(status);
      resolve(data);
    })),

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'registerForm',
  fields: ['email', 'password', 'confirmPassword'],
  validate
}, mapStateToProps, mapDispatchToProps)(UserRegisterComponent);
