
import httpClient from '../Http';

// Share on facebook
export const TWEET_ON_TWITTER = 'TWEET_ON_TWITTER';
export const TWEET_ON_TWITTER_SUCCESS = 'TWEET_ON_TWITTER_SUCCESS';
export const TWEET_ON_TWITTER_FAILURE = 'TWEET_ON_TWITTER_FAILURE';
export const RESET_TWEET_ON_TWITTER = 'RESET_TWEET_ON_TWITTER';

export function tweetOnTwitter(props) {
  return {
    type: TWEET_ON_TWITTER,
    payload: httpClient.post('/social/twitter/tweet', props)
  };
}
