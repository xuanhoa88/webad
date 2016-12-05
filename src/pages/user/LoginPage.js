import React, { Component } from 'react';

import HeaderContainer from '../../containers/HeaderContainer';

import UserLoginContainer from '../../containers/user/LoginContainer';

export default class UserLoginPage extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <UserLoginContainer { ...this.props } />
      </div>
    );
  }
}
