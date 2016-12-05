import React, { Component } from 'react';

import HeaderContainer from '../../containers/HeaderContainer';
import FooterContainer from '../../containers/FooterContainer';

import AdvertisementCategoryContainer from '../../containers/advertisement/CategoryContainer';

export default class AdvertisementCategoryPage extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <AdvertisementCategoryContainer { ...this.props } />
        <FooterContainer type="advertisement.byCategory" />
      </div>
    );
  }
}