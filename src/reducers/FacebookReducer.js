import {
  /**
   * Share on facebook
   */
  SHARE_ON_FACEBOOK,
  SHARE_ON_FACEBOOK_SUCCESS,
  SHARE_ON_FACEBOOK_FAILURE,
  RESET_SHARE_ON_FACEBOOK,
} from '../actions/social/FacebookAction';


const INITIAL_STATE = {
  facebookShare: {
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
    case SHARE_ON_FACEBOOK:
      return {...state,
        facebookShare: {
          loading: true,
          status: SHARE_ON_FACEBOOK
        }
      };
    case SHARE_ON_FACEBOOK_SUCCESS:
      return {...state,
        facebookShare: {
          payload: action.payload.data,
          loading: false,
          status: SHARE_ON_FACEBOOK_SUCCESS
        }
      };
    case SHARE_ON_FACEBOOK_FAILURE:
      error = action.payload.data || {
        message: action.payload.message
      }; //2nd one is network or server down errors
      return {...state,
        facebookShare: {
          error: error,
          loading: false,
          status: SHARE_ON_FACEBOOK_FAILURE
        }
      };
    case RESET_SHARE_ON_FACEBOOK:
      return {...state,
        facebookShare: {
          loading: false,
          status: RESET_SHARE_ON_FACEBOOK
        }
      };

      // Default
    default:
      return state;
  }
}
