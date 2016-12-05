import React, {
  Component,
  PropTypes
} from 'react';

import {
  Authentication
} from '../libraries/Authentication';

class BaseComponent extends Component {
  /**
   * Constructor
   */
  constructor(...args) {
    super(...args);

    // Set state
    this.state = new Object();
  }

  getChildContext() {
    return {
      authentication: Authentication,
    };
  }
}

BaseComponent.childContextTypes = {
  authentication: PropTypes.object,
};

BaseComponent.contextTypes = {
  router: PropTypes.object.isRequired,
  ...BaseComponent.childContextTypes,
}

export default BaseComponent;
