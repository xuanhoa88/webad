import React, { Component } from 'react';

import HeaderContainer from '../../containers/HeaderContainer';
import FooterContainer from '../../containers/FooterContainer';

import AdvertisementDetailContainer from '../../containers/advertisement/DetailContainer';

export default class AdvertisementDetailPage extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <AdvertisementDetailContainer { ...this.props } />
        <FooterContainer type="advertisement.detail" />
      </div>
    );
  }
}