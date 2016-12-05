import React, { Component, PropTypes } from 'react';
import TwitterProvider from './TwitterProvider';

class Tweet extends Component {

  constructor(props, context) {
    super(props, context);

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    /*
    const { twitter } = this.context;
    twitter.whenReady();

    if (twitter.twitter.initialized()) {
      twttr.ready((t) => {
          t.widgets.createShareButton(
            this.props.href,
            document.getElementById(this.props.id),
            {
              text: this.props.text,
              hashtags: this.props.hashtags,
              via: this.props.via,
              size: this.props.size,  
            }
          );
          t.events.bind('click', (...clickEventToAnalytics) => {
            console.log(...clickEventToAnalytics);
          });
          t.events.bind(
            'tweet',
            function (event) {
              // Do something there
              console.log(event);
            }
          );
      });
    }
    */
  }

  /**
   * Handle event click. 
   */
  onClick(event) {
    event.preventDefault();
    var $element = event.target;

    const shareUrl = 'https://twitter.com/intent/tweet';
    const params = {
            url: this.props.href,
            text: this.props.text,
            hashtags: this.props.hashtags,
            via: this.props.via,
            size: this.props.size,  
    };

    try {
      window.open(shareUrl + '?' + this.getSharerParams(params), '', this.getPopupParams());
    }
    catch (error) {
      console.error(error);
    }
    
    /*
    this.props.onClick.call(this, event, {
      text: this.props.text,
      hashtags: this.props.hashtags,
      via: this.props.via,
      size: this.props.size,  
    });
    */
  }

  /**
   * Render
   * 
   * Format { @{screen_name} {text} {http://url/} #{hashtags} via @{via} }
   */
  render() {
    const { buttonClassName, iconClassName, icon, text, ...attrs } = this.props;
    return (
        <span onClick={this.onClick}>
          {this.props.children}
        </span>
    );
  }

  getSharerParams(sharer) {
      return Object.keys(sharer).filter(function(key) {
        if (typeof sharer[key] === 'undefined') {
          return false;
        }
        return true;
      })
      .map(function(key) {
        return key + '=' + encodeURIComponent(sharer[key]);
      }).reduce(function(previous, current) {
        return previous + '&' + current;
      });
    }

    getPopupParams() {
      var width  = 575,
        height = 400,
        w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        left = ((w.innerWidth || e.clientWidth || g.clientWidth)  - width) / 2,
        top = ((w.innerHeight|| e.clientHeight|| g.clientHeight)  - height) / 2;

      return 'status=1' +
             ',width='  + width  +
             ',height=' + height +
             ',top='    + top    +
             ',left='   + left;
    }
}

Tweet.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  icon: PropTypes.bool,
  id: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  text: PropTypes.string,
  hashtags: PropTypes.string,
  via: PropTypes.string,
  size: PropTypes.string,
};

Tweet.contextTypes = {
  ...TwitterProvider.childContextTypes,
};

Tweet.defaultProps = {
  buttonClassName: 'btn btn-lg',
  iconClassName: 'fa fa-twitter pull-left',
  icon: true,
  size: 'default',
};

export default Tweet; 
