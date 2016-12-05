import {
  connect
} from 'react-redux';

import {
  userLogout,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} from '../actions/user/LogoutAction';

import HeaderComponent from '../components/HeaderComponent';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (params) => dispatch(userLogout(params)).then(response => {
      let data = response.payload.data;
      // if any one of these exist, then there is a field error
      if (!data.status) {
        // let other components know of error by updating the redux` state
        dispatch({
          type: USER_LOGOUT_FAILURE,
          payload: response.payload,
          message: USER_LOGOUT_FAILURE,
        });
      } else {

        // let other components know that we got user and things are fine by updating the redux` state
        dispatch({
          type: USER_LOGOUT_SUCCESS,
          payload: response.payload,
          message: USER_LOGOUT_SUCCESS,
        });
      }
    }),
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
