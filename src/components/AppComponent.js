import React from 'react';
import {
  Authentication
} from '../libraries/Authentication';
import BaseComponent from './BaseComponent';
import {
  FETCH_USER_PROFILE_SUCCESS,
} from '../actions/user/ProfileAction';

export default class AppComponent extends BaseComponent {
  constructor(...args) {
    super(...args);

    this._fetchUserProfileLoaded = false;
  }

  componentWillMount() {
    this._fetchUserProfile();
  }

  componentWillReceiveProps(nextProps) {
    const authentication = Object.assign({}, nextProps.user.authentication);
    if (authentication.status === 'unauthenticated' || authentication.error) {
      this._fetchUserProfileLoaded = false;
    }

    this._fetchUserProfile();
  }

  _fetchUserProfile() {
    if (this._fetchUserProfileLoaded) {
      return;
    }

    this._fetchUserProfileLoaded = true;
    this.props.fetchUserProfile({
      token: Authentication.getToken(),
    }).then(response => {
      if (!(response.type === FETCH_USER_PROFILE_SUCCESS)) {
        this._fetchUserProfileLoaded = false;
      }
    });
  }

  /**
   * View
   */
  render() {
    return this.props.children;
  }
}
