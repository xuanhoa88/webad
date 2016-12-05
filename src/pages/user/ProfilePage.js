import React, { Component } from 'react';

import HeaderContainer from '../../containers/HeaderContainer';
import FooterContainer from '../../containers/FooterContainer';

import UserProfileContainer from '../../containers/user/ProfileContainer';

export default class UserProfilePage extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <UserProfileContainer { ...this.props } />
        <FooterContainer type="user.profile" />
      </div>
    );
  }
}

