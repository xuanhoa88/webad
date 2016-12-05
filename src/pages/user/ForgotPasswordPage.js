import React, { Component } from 'react';

import HeaderContainer from '../../containers/HeaderContainer';
import UserForgotPasswordContainer from '../../containers/user/ForgotPasswordContainer';

export default class UserForgotPasswordPage extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <UserForgotPasswordContainer { ...this.props } />
      </div>
    );
  }
}
