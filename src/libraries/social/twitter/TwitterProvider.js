import { Component, PropTypes, Children } from 'react';
import Twitter from './Twitter';

let twitterInstance = null;

class TwitterProvider extends Component {

    getChildContext() {
        return {
            twitter: this,
        };
    }

    whenReady(callback) {
        const props = this.props;

        if (!this.twitter) {
            this.twitter = twitterInstance = twitterInstance || new Twitter({
                consumerKey: props.env.TWITTER_CONSUMER_KEY,
                consumerSecret: props.env.TWITTER_CONSUMER_SECRET,
                accessTokenKey: props.env.TWITTER_ACCESS_TOKEN_KEY,
                accessTokenSecret: props.env.TWITTER_ACCESS_TOKEN_SECRET,
            });
        }

        this.twitter.whenReady();
    }

    render() {
        return Children.only(this.props.children);
    }
}

TwitterProvider.propTypes = {
    children: PropTypes.node,
    env: PropTypes.object.isRequired,
};

TwitterProvider.childContextTypes = {
    twitter: PropTypes.object.isRequired,
};

export default TwitterProvider;