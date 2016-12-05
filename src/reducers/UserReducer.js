/**
 * Logout
 */
import {
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} from '../actions/user/LogoutAction';

/**
 * Register
 */
import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_FACEBOOK,
  USER_REGISTER_FACEBOOK_FAILURE,
  USER_REGISTER_FACEBOOK_SUCCESS,
  USER_REGISTER_GOOGLE,
  USER_REGISTER_GOOGLE_FAILURE,
  USER_REGISTER_GOOGLE_SUCCESS
} from '../actions/user/RegisterAction';

/**
 * Fetch profile
 */
import {
  FETCH_USER_PROFILE,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  FETCH_ALL_OCCUPATIONS,
  FETCH_ALL_OCCUPATIONS_SUCCESS,
  FETCH_ALL_OCCUPATIONS_FAILURE,
  FETCH_ALL_COUNTRIES,
  FETCH_ALL_COUNTRIES_SUCCESS,
  FETCH_ALL_COUNTRIES_FAILURE,
  FETCH_ALL_DISTRICTS,
  FETCH_ALL_DISTRICTS_SUCCESS,
  FETCH_ALL_DISTRICTS_FAILURE
} from '../actions/user/ProfileAction';

/**
 * Login
 */
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from '../actions/user/LoginAction';

/**
 * Reset Password
 */
import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../actions/user/ForgotPasswordAction';


/**
 * Renew token
 */
import {
  USER_RENEW_TOKEN,
  USER_RENEW_TOKEN_SUCCESS,
  USER_RENEW_TOKEN_FAILURE,
} from '../actions/user/RenewTokenAction';

/**
 * Reward history
 */
import {
  FETCH_ALL_USER_REWARD_HISTORY,
  FETCH_ALL_USER_REWARD_HISTORY_SUCCESS,
  FETCH_ALL_USER_REWARD_HISTORY_FAILURE,
  RESET_FETCH_ALL_USER_REWARD_HISTORY,
} from '../actions/user/RewardHistoryAction';

/**
 * Transaction history
 */
import {
  FETCH_ALL_USER_TRANSACTION_HISTORY,
  FETCH_ALL_USER_TRANSACTION_HISTORY_SUCCESS,
  FETCH_ALL_USER_TRANSACTION_HISTORY_FAILURE,
} from '../actions/user/TransactionHistoryAction';

/**
 * Cashout
 */
import {
  FETCH_ALL_USER_CASH_OUT,
  FETCH_ALL_USER_CASH_OUT_SUCCESS,
  FETCH_ALL_USER_CASH_OUT_FAILURE,
} from '../actions/user/CashOutAction';

/**
 * Favourite
 */
import {
  FETCH_ALL_USER_FAVOURITE,
  FETCH_ALL_USER_FAVOURITE_SUCCESS,
  FETCH_ALL_USER_FAVOURITE_FAILURE,
} from '../actions/user/FavouriteAction';

/**
 * Balance
 */
import {
  FETCH_ALL_USER_BALANCE,
  FETCH_ALL_USER_BALANCE_SUCCESS,
  FETCH_ALL_USER_BALANCE_FAILURE,
} from '../actions/user/BalanceAction';

// Initial state
const INITIAL_STATE = {
  renewToken: {
    payload: [],
    error: false,
    loading: true,
    status: 'user.renewToken',
    message: null
  },
  authentication: {
    payload: [],
    error: false,
    loading: true,
    status: 'user.authentication',
    message: null
  },
  rewardHistory: {
    payload: [],
    error: false,
    loading: true,
    status: 'user.rewardHistory',
    message: null
  },
  transactionHistory: {
    payload: [],
    error: false,
    loading: true,
    status: 'user.transactionHistory',
    message: null
  },
  cashOut: {
    payload: [],
    error: false,
    loading: true,
    status: 'user.cashOut',
    message: null
  },
  profile: {
    payload: [],
    error: false,
    loading: true,
    status: 'user.profile',
    message: null
  },
  favourite: {
    payload: [],
    error: false,
    loading: true,
    status: 'user.favourite',
    message: null
  },
  balance: {
    payload: [],
    error: false,
    loading: true,
    status: 'user.balance',
    message: null
  },
  occupations: {
    payload: [],
    error: false,
    loading: true,
    status: 'user.occupations',
    message: null
  },
};

export default function(state = INITIAL_STATE, action) {
  let error, message;

  switch (action.type) {

    /**
     * Renew token
     */
    case USER_RENEW_TOKEN:
      return {...state,
        renewToken: {...INITIAL_STATE.renewToken,
          loading: true
        }
      };
    case USER_RENEW_TOKEN_SUCCESS:
      return {...state,
        renewToken: {...INITIAL_STATE.renewToken,
          payload: action.payload.data,
          status: 'authenticated',
          loading: false
        }
      }; //<-- authenticated
    case USER_RENEW_TOKEN_FAILURE:
      message = (action.payload.data.message || action.payload.message || USER_RENEW_TOKEN_FAILURE);
      return {...state,
        renewToken: {...INITIAL_STATE.renewToken,
          payload: action.payload.data,
          status: 'unauthenticated',
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Register
       */
    case USER_REGISTER:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          loading: true
        }
      };
    case USER_REGISTER_SUCCESS:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          payload: action.payload.data,
          status: 'authenticated',
          loading: false
        }
      }; //<-- authenticated
    case USER_REGISTER_FAILURE:
      message = (action.payload.data.message || action.payload.message || USER_REGISTER_FAILURE);
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          payload: action.payload.data,
          status: 'unauthenticated',
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Register facebook
       */
    case USER_REGISTER_FACEBOOK:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          loading: true
        }
      };
    case USER_REGISTER_FACEBOOK_SUCCESS:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          payload: action.payload.data,
          status: 'authenticated',
          loading: false
        }
      }; //<-- authenticated
    case USER_REGISTER_FACEBOOK_FAILURE:
      message = (action.payload.data.message || action.payload.message || USER_REGISTER_FAILURE);
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          payload: action.payload.data,
          status: 'unauthenticated',
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Register google
       */
    case USER_REGISTER_GOOGLE:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          loading: true
        }
      };
    case USER_REGISTER_GOOGLE_SUCCESS:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          payload: action.payload.data,
          status: 'authenticated',
          loading: false
        }
      }; //<-- authenticated
    case USER_REGISTER_GOOGLE_FAILURE:
      message = (action.payload.data.message || action.payload.message || USER_REGISTER_FAILURE);
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          payload: action.payload.data,
          status: 'unauthenticated',
          error: true,
          message: message,
          loading: false
        }
      };
      /**
       * Fetch profile
       */
    case FETCH_USER_PROFILE:
      return {...state,
        profile: {...INITIAL_STATE.profile,
          loading: true
        }
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {...state,
        profile: {...INITIAL_STATE.profile,
          payload: action.payload.data,
          status: 'authenticated',
          loading: false
        }
      }; //<-- authenticated
    case FETCH_USER_PROFILE_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_USER_PROFILE_FAILURE);
      return {...state,
        profile: {...INITIAL_STATE.profile,
          payload: action.payload.data,
          status: 'unauthenticated',
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Update profile
       */
    case UPDATE_USER_PROFILE:
      return {...state,
        profile: {...INITIAL_STATE.profile,
          loading: true
        }
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {...state,
        profile: {...INITIAL_STATE.profile,
          payload: action.payload.data,
          status: 'authenticated',
          loading: false
        }
      }; //<-- authenticated
    case UPDATE_USER_PROFILE_FAILURE:
      message = (action.payload.data.message || action.payload.message || UPDATE_USER_PROFILE_FAILURE);
      return {...state,
        profile: {...INITIAL_STATE.profile,
          payload: action.payload.data,
          status: 'unauthenticated',
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Login
       */
    case USER_LOGIN:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          loading: true
        }
      };
    case USER_LOGIN_SUCCESS:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          payload: action.payload.data,
          status: 'authenticated',
          loading: false
        }
      }; //<-- authenticated
    case USER_LOGIN_FAILURE:
      message = (action.payload.data.message || action.payload.message || USER_LOGIN_FAILURE);
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          payload: action.payload.data,
          status: 'unauthenticated',
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Reset Password
       */
    case RESET_PASSWORD:
      return {...state,
        resetpassword: {...INITIAL_STATE.resetpassword,
          loading: true
        }
      };
    case RESET_PASSWORD_SUCCESS:
      return {...state,
        resetpassword: {...INITIAL_STATE.resetpassword,
          payload: action.payload.data,
          status: 'RESET_PASSWORD_SUCCESS',
          loading: false
        }
      };
    case RESET_PASSWORD_FAILURE:
      message = (action.payload.data.message || action.payload.message || RESET_PASSWORD_FAILURE);
      return {...state,
        resetpassword: {...INITIAL_STATE.resetpassword,
          payload: action.payload.data,
          status: 'RESET_PASSWORD_FAILURE',
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Reward history
       */
    case FETCH_ALL_USER_REWARD_HISTORY:
      return {...state,
        rewardHistory: {...INITIAL_STATE.rewardHistory,
          loading: true
        }
      };
    case FETCH_ALL_USER_REWARD_HISTORY_SUCCESS:
      return {...state,
        rewardHistory: {...INITIAL_STATE.rewardHistory,
          payload: action.payload.data,
          loading: false
        }
      }; //<-- authenticated
    case FETCH_ALL_USER_REWARD_HISTORY_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_USER_REWARD_HISTORY_FAILURE);
      return {...state,
        rewardHistory: {...INITIAL_STATE.rewardHistory,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Transaction history
       */
    case FETCH_ALL_USER_TRANSACTION_HISTORY:
      return {...state,
        transactionHistory: {...INITIAL_STATE.transactionHistory,
          loading: true
        }
      };
    case FETCH_ALL_USER_TRANSACTION_HISTORY_SUCCESS:
      return {...state,
        transactionHistory: {...INITIAL_STATE.transactionHistory,
          payload: action.payload.data,
          loading: false
        }
      }; //<-- authenticated
    case FETCH_ALL_USER_TRANSACTION_HISTORY_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_USER_TRANSACTION_HISTORY_FAILURE);
      return {...state,
        transactionHistory: {...INITIAL_STATE.transactionHistory,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Cash Out
       */
    case FETCH_ALL_USER_CASH_OUT:
      return {...state,
        cashOut: {...INITIAL_STATE.cashOut,
          loading: true
        }
      };
    case FETCH_ALL_USER_CASH_OUT_SUCCESS:
      return {...state,
        cashOut: {...INITIAL_STATE.cashOut,
          payload: action.payload.data,
          loading: false
        }
      }; //<-- authenticated
    case FETCH_ALL_USER_CASH_OUT_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_USER_CASH_OUT_FAILURE);
      return {...state,
        cashOut: {...INITIAL_STATE.cashOut,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };


      /**
       * Logout
       */
    case USER_LOGOUT:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          loading: true
        }
      };
    case USER_LOGOUT_SUCCESS:
      return {...state,
        authentication: {...INITIAL_STATE.authentication,
          payload: action.payload.data,
          status: 'unauthenticated',
          loading: false
        }
      }; //<-- unauthenticated
    case USER_LOGOUT_FAILURE:
      message = (action.payload.data.message || action.payload.message || USER_LOGOUT_FAILURE);
      return {...state,
        authentication: {...INITIAL_STATE.logout,
          payload: action.payload.data,
          status: 'unauthenticated',
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Favourite
       */
    case FETCH_ALL_USER_FAVOURITE:
      return {...state,
        favourite: {...INITIAL_STATE.favourite,
          loading: true
        }
      };
    case FETCH_ALL_USER_FAVOURITE_SUCCESS:
      return {...state,
        favourite: {...INITIAL_STATE.favourite,
          payload: action.payload.data,
          loading: false
        }
      };
    case FETCH_ALL_USER_FAVOURITE_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_USER_FAVOURITE_FAILURE);
      return {...state,
        favourite: {...INITIAL_STATE.favourite,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Balance
       */
    case FETCH_ALL_USER_BALANCE:
      return {...state,
        balance: {...INITIAL_STATE.balance,
          loading: true
        }
      };
    case FETCH_ALL_USER_BALANCE_SUCCESS:
      return {...state,
        balance: {...INITIAL_STATE.balance,
          payload: action.payload.data,
          loading: false
        }
      };
    case FETCH_ALL_USER_BALANCE_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_USER_BALANCE_FAILURE);
      return {...state,
        balance: {...INITIAL_STATE.balance,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Occupation
       */
    case FETCH_ALL_OCCUPATIONS:
      return {...state,
        occupations: {...INITIAL_STATE.occupations,
          loading: true
        }
      };
    case FETCH_ALL_OCCUPATIONS_SUCCESS:
      return {...state,
        occupations: {...INITIAL_STATE.occupations,
          payload: action.payload.data,
          loading: false
        }
      }; //<-- authenticated
    case FETCH_ALL_OCCUPATIONS_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_OCCUPATIONS_FAILURE);
      return {...state,
        occupations: {...INITIAL_STATE.occupations,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Countries
       */
    case FETCH_ALL_COUNTRIES:
      return {...state,
        countries: {...INITIAL_STATE.countries,
          loading: true
        }
      };
    case FETCH_ALL_COUNTRIES_SUCCESS:
      return {...state,
        countries: {...INITIAL_STATE.countries,
          payload: action.payload.data,
          loading: false
        }
      }; //<-- authenticated
    case FETCH_ALL_COUNTRIES_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_COUNTRIES_FAILURE);
      return {...state,
        countries: {...INITIAL_STATE.countries,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

      /**
       * Districts
       */
    case FETCH_ALL_DISTRICTS:
      return {...state,
        districts: {...INITIAL_STATE.districts,
          loading: true
        }
      };
    case FETCH_ALL_DISTRICTS_SUCCESS:
      return {...state,
        districts: {...INITIAL_STATE.districts,
          payload: action.payload.data,
          loading: false
        }
      }; //<-- authenticated
    case FETCH_ALL_DISTRICTS_FAILURE:
      message = (action.payload.data.message || action.payload.message || FETCH_ALL_DISTRICTS_FAILURE);
      return {...state,
        districts: {...INITIAL_STATE.districts,
          payload: action.payload.data,
          error: true,
          message: message,
          loading: false
        }
      };

    default:
      return state;
  }
}
