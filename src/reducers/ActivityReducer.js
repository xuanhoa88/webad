import {
  /**
   * Share on facebook
   */
  SHARE_ON_SOCIAL_NETWORK,
  SHARE_ON_SOCIAL_NETWORK_SUCCESS,
  SHARE_ON_SOCIAL_NETWORK_FAILURE,
  RESET_SHARE_ON_SOCIAL_NETWORK,
} from '../actions/ActivityAction';


const INITIAL_STATE = {
  activityShare: {
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
    case SHARE_ON_SOCIAL_NETWORK:
      return {...state,
        activityShare: {
          loading: true,
          status: SHARE_ON_SOCIAL_NETWORK
        }
      };
    case SHARE_ON_SOCIAL_NETWORK_SUCCESS:
      return {...state,
        activityShare: {
          payload: action.payload.data,
          loading: false,
          status: SHARE_ON_SOCIAL_NETWORK_SUCCESS
        }
      };
    case SHARE_ON_SOCIAL_NETWORK_FAILURE:
      error = action.payload.data || {
        message: action.payload.message
      }; //2nd one is network or server down errors
      return {...state,
        activityShare: {
          error: error,
          loading: false,
          status: SHARE_ON_SOCIAL_NETWORK_FAILURE
        }
      };
    case RESET_SHARE_ON_SOCIAL_NETWORK:
      return {...state,
        activityShare: {
          loading: false,
          status: RESET_SHARE_ON_SOCIAL_NETWORK
        }
      };

      // Default
    default:
      return state;
  }
}
