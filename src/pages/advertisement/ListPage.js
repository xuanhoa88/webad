import React, { Component } from 'react';

import HeaderContainer from '../../containers/HeaderContainer';
import FooterContainer from '../../containers/FooterContainer';

import AdvertisementListContainer from '../../containers/advertisement/ListContainer';

class AdvertisementListPage extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <AdvertisementListContainer { ...this.props } />
        <FooterContainer type="advertisement.list" />
      </div>
    );
  }
}

export default AdvertisementListPage;