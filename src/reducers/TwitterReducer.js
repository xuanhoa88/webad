import {
  /**
   * Share on facebook
   */
  TWEET_ON_TWITTER,
  TWEET_ON_TWITTER_SUCCESS,
  TWEET_ON_TWITTER_FAILURE,
  RESET_TWEET_ON_TWITTER,
} from '../actions/social/TwitterAction';


const INITIAL_STATE = {
  tweetTwitter: {
    payload: [],
    error: null,
    loading: true
  },
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    /**
     * Quiz
     */
    case TWEET_ON_TWITTER:
      return {...state,
        tweetTwitter: {
          loading: true,
          status: TWEET_ON_TWITTER
        }
      };
    case TWEET_ON_TWITTER_SUCCESS:
      return {...state,
        tweetTwitter: {
          payload: action.payload.data,
          loading: false,
          status: TWEET_ON_TWITTER_SUCCESS
        }
      };
    case TWEET_ON_TWITTER_FAILURE:
      error = action.payload.data || {
        message: action.payload.message
      }; //2nd one is network or server down errors
      return {...state,
        tweetTwitter: {
          error: error,
          loading: false,
          status: TWEET_ON_TWITTER_FAILURE
        }
      };
    case RESET_TWEET_ON_TWITTER:
      return {...state,
        tweetTwitter: {
          loading: false,
          status: RESET_TWEET_ON_TWITTER
        }
      };

      // Default
    default:
      return state;
  }
}
