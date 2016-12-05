import React from 'react';
import { Link } from 'react-router';

import AdvertisementListComponent from './ListComponent';

export default class AdvertisementCategoryComponent extends AdvertisementListComponent {
  /**
   * Autoload from service
   */
  componentWillMount() {
    this.props.fetchAllCategories();
    this.props.fetchAllAdvertisementsByCategory({
      category_id: this.props.params.id,
      token: this.context.authentication.getToken(),
    }).then(response => {
      this.setState({
        advertises: response.data.data
      });
    });
  }

  /**
   * Reinvoke advertisements
   */
  componentWillUpdate(nextProps, nextState) {
    // Re-invoke when change category id
    if (!(nextProps.params.id === this.props.params.id)) {
      this.props.fetchAllAdvertisementsByCategory({
        category_id: nextProps.params.id,
        token: this.context.authentication.getToken(),
      }).then(response => {
        this.setState({
          advertises: response.data.data
        });
      });
    }

    return true;
  }
}
