import React, { Component } from 'react';

import HeaderContainer from '../../containers/HeaderContainer';
import FooterContainer from '../../containers/FooterContainer';

import UserRegisterContainer from '../../containers/user/RegisterContainer';

export default class UserRegisterPage extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <UserRegisterContainer { ...this.props } />
        <FooterContainer type="user.registerPage" />
      </div>
    );
  }
}
