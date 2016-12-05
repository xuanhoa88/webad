import {
  /**
   * All advertisements
   */
  FETCH_ALL_ADVERTISEMENTS,
  FETCH_ALL_ADVERTISEMENTS_SUCCESS,
  FETCH_ALL_ADVERTISEMENTS_FAILURE,
  /**
   * All categories
   */
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_FAILURE,
  /**
   * Filter by category
   */
  FETCH_ADVERTISEMENTS_BY_CATEGORY,
  FETCH_ADVERTISEMENTS_BY_CATEGORY_SUCCESS,
  FETCH_ADVERTISEMENTS_BY_CATEGORY_FAILURE,
  /**
   * Filter by multiple criteria
   */
  FETCH_ADVERTISEMENTS_BY_CRITERIA,
  FETCH_ADVERTISEMENTS_BY_CRITERIA_SUCCESS,
  FETCH_ADVERTISEMENTS_BY_CRITERIA_FAILURE,
  /**
   * Fetch advertisement detail
   */
  FETCH_ADVERTISEMENT_DETAIL,
  FETCH_ADVERTISEMENT_DETAIL_SUCCESS,
  FETCH_ADVERTISEMENT_DETAIL_FAILURE,
  /**
   * Like advertisement
   */
  LIKE_ADVERTISEMENT,
  LIKE_ADVERTISEMENT_SUCCESS,
  LIKE_ADVERTISEMENT_FAILURE,
  RESET_LIKE_ADVERTISEMENT,
  /**
   * Post comment advertisement
   */
  POST_COMMENT_ADVERTISEMENT,
  POST_COMMENT_ADVERTISEMENT_SUCCESS,
  POST_COMMENT_ADVERTISEMENT_FAILURE,
  /**
   * Fetch comment advertisement
   */
  FETCH_COMMENT_ADVERTISEMENT,
  FETCH_COMMENT_ADVERTISEMENT_SUCCESS,
  FETCH_COMMENT_ADVERTISEMENT_FAILURE,

  /**
   * Add to favorite advertisement
   */
  ADD_TO_FAVORITE,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,

} from '../actions/AdvertisementAction';


const INITIAL_STATE = {
  advertisements: {
    payload: [],
    error: false,
    loading: true,
    status: 'advertisement.list',
    message: null
  },
  categories: {
    payload: [],
    error: false,
    loading: true,
    status: 'advertisement.category',
    message: null
  },
  advertisementDetail: {
    payload: [],
    error: false,
    loading: true,
    status: 'advertisement.detail',
    message: null
  },
  advertisementLike: {
    payload: [],
    error: false,
    loading: true,
    status: 'advertisement.like',
    message: null
  },
  postComment: {
    payload: [],
    error: false,
    loading: true,
    status: 'advertisement.postComment',
    message: null
  },
  fetchComment: {
    payload: [],
    error: false,
    loading: true,
    status: 'advertisement.listComment',
    message: null
  },
  advertisementFavorite: {
    payload: [],
    error: false,
    loading: true,
    status: 'advertisement.addToFavorite',
    message: null
  },
};

export default function(state = INITIAL_STATE, action) {
  let error, message;
  switch (action.type) {
    /**
     * All advertisements
     */
    case FETCH_ALL_ADVERTISEMENTS: // start fetching categories and set loading = true
      return {...state,
        advertisements: {...INITIAL_STATE.advertisements
        }
      };
    case FETCH_ALL_ADVERTISEMENTS_SUCCESS: // return list of categories and make loading = false
      return {...state,
        advertisements: {...INITIAL_STATE.advertisements,
          payload: action.payload.data,
          loading: false
        }
      }
    case FETCH_ALL_ADVERTISEMENTS_FAILURE: // return error and make loading = false
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_ADVERTISEMENTS_FAILURE); //2nd one is network or server down errors
      return {...state,
        advertisements: {...INITIAL_STATE.advertisements,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };


      /**
       * All categories
       */
    case FETCH_ALL_CATEGORIES: // start fetching categories and set loading = true
      return {...state,
        categories: {...INITIAL_STATE.categories
        }
      };
    case FETCH_ALL_CATEGORIES_SUCCESS: // return list of categories and make loading = false
      return {...state,
        categories: {...INITIAL_STATE.categories,
          payload: action.payload.data,
          loading: false
        }
      }
    case FETCH_ALL_CATEGORIES_FAILURE: // return error and make loading = false
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_CATEGORIES_FAILURE); //2nd one is network or server down errors
      return {...state,
        categories: {...INITIAL_STATE.categories,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Filter by category
       */
    case FETCH_ADVERTISEMENTS_BY_CATEGORY:
      return {...state,
        advertisements: {...INITIAL_STATE.advertisements
        }
      };
    case FETCH_ADVERTISEMENTS_BY_CATEGORY_SUCCESS:
      return {...state,
        advertisements: {...INITIAL_STATE.advertisements,
          payload: action.payload.data,
          loading: false
        }
      };
    case FETCH_ADVERTISEMENTS_BY_CATEGORY_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ADVERTISEMENTS_BY_CATEGORY_FAILURE); //2nd one is network or server down errors
      return {...state,
        advertisements: {...INITIAL_STATE.advertisements,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Filter by multiple criteria
       */
    case FETCH_ADVERTISEMENTS_BY_CRITERIA:
      return {...state,
        advertisements: {...INITIAL_STATE.advertisements
        }
      };
    case FETCH_ADVERTISEMENTS_BY_CRITERIA_SUCCESS:
      return {...state,
        advertisements: {...INITIAL_STATE.advertisements,
          payload: action.payload.data,
          loading: false
        }
      };
    case FETCH_ADVERTISEMENTS_BY_CRITERIA_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ADVERTISEMENTS_BY_CATEGORY_FAILURE); //2nd one is network or server down errors
      return {...state,
        advertisements: {...INITIAL_STATE.advertisements,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Fetch advertisement detail
       */
    case FETCH_ADVERTISEMENT_DETAIL:
      return {...state,
        advertisementDetail: {...INITIAL_STATE.advertisementDetail
        }
      };
    case FETCH_ADVERTISEMENT_DETAIL_SUCCESS:
      return {...state,
        advertisementDetail: {...INITIAL_STATE.advertisementDetail,
          payload: action.payload.data,
          loading: false
        }
      };
    case FETCH_ADVERTISEMENT_DETAIL_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ADVERTISEMENT_DETAIL_FAILURE); //2nd one is network or server down errors
      return {...state,
        advertisementDetail: {...INITIAL_STATE.advertisementDetail,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Like advertisement
       */
    case LIKE_ADVERTISEMENT:
      return {...state,
        advertisementLike: {
          loading: true
        }
      };
    case LIKE_ADVERTISEMENT_SUCCESS:
      return {...state,
        advertisementLike: {
          payload: action.payload.data,
          loading: false
        }
      };
    case LIKE_ADVERTISEMENT_FAILURE:
      error = action.payload.data || {
        message: action.payload.message
      }; //2nd one is network or server down errors
      return {...state,
        advertisementLike: {
          error: error,
          loading: false
        }
      };
    case RESET_LIKE_ADVERTISEMENT:
      return {...state,
        advertisementLike: {
          loading: false
        }
      };

      /**
       * Post comment advertisement
       */
    case POST_COMMENT_ADVERTISEMENT:
      return {...state,
        postComment: {...INITIAL_STATE.postComment
        }
      };
    case POST_COMMENT_ADVERTISEMENT_SUCCESS:
      return {...state,
        postComment: {...INITIAL_STATE.postComment,
          payload: action.payload.data,
          loading: false
        }
      };
    case POST_COMMENT_ADVERTISEMENT_FAILURE:
      message = (action.payload.data.message || action.payload.message || COMMENT_ADVERTISEMENT_FAILURE); //2nd one is network or server down errors
      return {...state,
        postComment: {...INITIAL_STATE.postComment,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * fetch comment advertisement
       */
    case FETCH_COMMENT_ADVERTISEMENT:
      return {...state,
        fetchComment: {...INITIAL_STATE.fetchComment
        }
      };
    case FETCH_COMMENT_ADVERTISEMENT_SUCCESS:
      return {...state,
        fetchComment: {...INITIAL_STATE.fetchComment,
          payload: action.payload.data,
          loading: false
        }
      };
    case FETCH_COMMENT_ADVERTISEMENT_FAILURE:
      message = (action.payload.data.message || action.payload.message || COMMENT_ADVERTISEMENT_FAILURE); //2nd one is network or server down errors
      return {...state,
        fetchComment: {...INITIAL_STATE.fetchComment,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Add to favorite
       */
    case ADD_TO_FAVORITE:
      return {...state,
        advertisementFavorite: {
          loading: true
        }
      };
    case ADD_TO_FAVORITE_SUCCESS:
      return {...state,
        advertisementFavorite: {
          payload: action.payload.data,
          loading: false
        }
      };
    case ADD_TO_FAVORITE_FAILURE:
      error = action.payload.data || {
        message: action.payload.message
      }; //2nd one is network or server down errors
      return {...state,
        advertisementFavorite: {
          error: error,
          loading: false
        }
      };

      // Default
    default:
      return state;
  }
}
