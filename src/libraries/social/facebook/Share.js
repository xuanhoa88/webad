import React, { PropTypes } from 'react';
import { Share as FacebookShare } from 'react-facebook';

class Share extends FacebookShare {
  /**
   * Init facebook javascript sdk
   */
  componentDidMount() {
    this.context.facebook.whenReady((err, facebook) => {
      if (err) {
        this.props.whenReady(err);
        return;
      }

      this.setState({ facebook });

      if (this.props.onReady) {
        this.props.onReady();
      }
    });
  }

  /**
   * Handle event click.
   * { Replace root method }
   */

  handleClick(evn) {
    window.FB.ui({
      method: 'share',
      href: this.props.href,
      picture: this.props.picture,
      name: this.props.name,
      description: this.props.description
    }, this.props.onSubmit);
  }

  render() {
    const { buttonClassName, iconClassName, icon } = this.props;

    return (
        <span onClick={this.handleClick.bind(this, this.props)}>
          {this.props.children}
        </span>
    );
  }
}

Share.propTypes = {
  ...FacebookShare.propTypes,
  onSubmit: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  whenReady: PropTypes.func,
  onReady: PropTypes.func,
  hashtag: PropTypes.any,
  quote: PropTypes.any,
  mobile_iframe: PropTypes.any,
};

export default Share;
