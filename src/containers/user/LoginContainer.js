import {
  reduxForm
} from 'redux-form';

import {
  Authentication
} from '../../libraries/Authentication';
import {
  Validator
} from '../../components/ui/form';
import UserLoginComponent from '../../components/user/LoginComponent';
import {
  userLogin,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from '../../actions/user/LoginAction';

// Client side validation
const validate = (data) => {
  let vv = Validator.make({
    data,
    rules: {
      email: 'required|email',
      password: 'required|min:6',
    },
    names: {
      email: 'User ID',
      password: 'Password',
    }
  });

  let hasErrors, errors;
  if (hasErrors = vv.fails()) {
    errors = vv.firstErrors;
  }

  return hasErrors && errors;
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginAPI: (formData, dispatch) => {
      return new Promise((resolve, reject) => {
        dispatch(userLogin(formData)).then((response) => {
          let data = response.payload.data;

          // if any one of these exist, then there is a field error
          if (!data.status) {
            // let other components know of error by updating the redux` state
            console.log(response.payload);
            dispatch({
              type: USER_LOGIN_FAILURE,
              payload: response.payload,
              message: USER_LOGIN_FAILURE,
            });

            Authentication.removeToken();

            // this is for redux-form itself
            reject(data);
          } else {
            // store JWT Token to browser session storage
            // If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
            // sessionStorage = persisted only in current tab
            Authentication.setToken(data.data.token);
            if (formData.rememberMe == true) {
              localStorage.setItem('email_login', formData.email);
              localStorage.setItem('password_login', formData.password);
            }

            // let other components know that we got user and things are fine by updating the redux` state
            dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: response.payload,
              message: USER_LOGIN_SUCCESS,
            });

            // this is for redux-form itself
            resolve(data);
          }
        });
      });
    },
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
const initialValues = {
  email: (localStorage.getItem('email_login') || '') + '',
  password: (localStorage.getItem('password_login') || '') + ''
};
export default reduxForm({
  form: 'loginForm',
  fields: ['email', 'password', 'rememberMe'],
  validate,
  initialValues: initialValues
}, mapStateToProps, mapDispatchToProps)(UserLoginComponent);
