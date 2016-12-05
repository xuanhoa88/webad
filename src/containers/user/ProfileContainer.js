import {
  connect
} from 'react-redux';

import UserProfileComponent from '../../components/user/ProfileComponent';

import {
  fetchAllUserFavoutites,
  FETCH_ALL_USER_FAVOURITE_SUCCESS,
  FETCH_ALL_USER_FAVOURITE_FAILURE,
} from '../../actions/user/FavouriteAction';

import {
  updateUserProfile,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  getAllOccupations,
  FETCH_ALL_OCCUPATIONS_SUCCESS,
  FETCH_ALL_OCCUPATIONS_FAILURE,
  getAllCountries,
  FETCH_ALL_COUNTRIES_SUCCESS,
  FETCH_ALL_COUNTRIES_FAILURE,
  getAllDistricts,
  FETCH_ALL_DISTRICTS_SUCCESS,
  FETCH_ALL_DISTRICTS_FAILURE
} from '../../actions/user/ProfileAction';

import {
  fetchAllUserTransactionHistory,
  FETCH_ALL_USER_TRANSACTION_HISTORY_SUCCESS,
  FETCH_ALL_USER_TRANSACTION_HISTORY_FAILURE,
} from '../../actions/user/TransactionHistoryAction';

import {
  fetchAllUserRewardHistory,
  FETCH_ALL_USER_REWARD_HISTORY_SUCCESS,
  FETCH_ALL_USER_REWARD_HISTORY_FAILURE,
} from '../../actions/user/RewardHistoryAction';

import {
  fetchAllUserBalance,
  FETCH_ALL_USER_BALANCE_SUCCESS,
  FETCH_ALL_USER_BALANCE_FAILURE,
} from '../../actions/user/BalanceAction';

import {
  fetchAllUserCashOut,
  FETCH_ALL_USER_CASH_OUT_SUCCESS,
  FETCH_ALL_USER_CASH_OUT_FAILURE,

} from '../../actions/user/CashOutAction';

import {
  unFavorite,
  UN_FAVORITE_SUCCESS,
  UN_FAVORITE_FAILURE,

} from '../../actions/AdvertisementAction';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Get user information
     */
    fetchAllUserFavoutites: (params) => dispatch(fetchAllUserFavoutites(params)).then(response => {
      let data = response.payload.data;

      let status = {
        payload: response.payload,
        type: FETCH_ALL_USER_FAVOURITE_SUCCESS,
        message: data.message || FETCH_ALL_USER_FAVOURITE_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = FETCH_ALL_USER_FAVOURITE_FAILURE;
        status.message = data.message || FETCH_ALL_USER_FAVOURITE_FAILURE;
      }

      dispatch(status);
    }),

    /**
     * Update user information
     */
    updateUserProfile: (formData) => new Promise((resolve, reject) => dispatch(updateUserProfile(formData)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: UPDATE_USER_PROFILE_SUCCESS,
        message: data.message || UPDATE_USER_PROFILE_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = UPDATE_USER_PROFILE_FAILURE;
        status.message = data.message || UPDATE_USER_PROFILE_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    /**
     * Transaction history
     */
    fetchAllUserTransactionHistory: (params) => new Promise((resolve, reject) => dispatch(fetchAllUserTransactionHistory(params)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: FETCH_ALL_USER_TRANSACTION_HISTORY_SUCCESS,
        message: data.message || FETCH_ALL_USER_TRANSACTION_HISTORY_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = FETCH_ALL_USER_TRANSACTION_HISTORY_FAILURE;
        status.message = data.message || FETCH_ALL_USER_TRANSACTION_HISTORY_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    /**
     * Reward history
     */
    fetchAllUserRewardHistory: (params) => new Promise((resolve, reject) => dispatch(fetchAllUserRewardHistory(params)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: FETCH_ALL_USER_REWARD_HISTORY_SUCCESS,
        message: data.message || FETCH_ALL_USER_REWARD_HISTORY_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = FETCH_ALL_USER_REWARD_HISTORY_FAILURE;
        status.message = data.message || FETCH_ALL_USER_REWARD_HISTORY_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    /**
     * Balance
     */
    fetchAllUserBalance: (params) => new Promise((resolve, reject) => dispatch(fetchAllUserBalance(params)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: FETCH_ALL_USER_BALANCE_SUCCESS,
        message: data.message || FETCH_ALL_USER_BALANCE_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = FETCH_ALL_USER_BALANCE_FAILURE;
        status.message = data.message || FETCH_ALL_USER_BALANCE_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    /**
     * Cash Out
     */
    fetchAllUserCashOut: (formData) => new Promise((resolve, reject) => dispatch(fetchAllUserCashOut(formData)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: FETCH_ALL_USER_CASH_OUT_SUCCESS,
        message: data.message || FETCH_ALL_USER_CASH_OUT_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = FETCH_ALL_USER_CASH_OUT_FAILURE;
        status.message = data.message || FETCH_ALL_USER_CASH_OUT_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    /**Get All Occupations **/
    getAllOccupations: () => {
      dispatch(getAllOccupations()).then((response) => {
        let status = {
          payload: response.payload,
          type: FETCH_ALL_OCCUPATIONS_SUCCESS
        };

        if (response.error) {
          status.type = FETCH_ALL_OCCUPATIONS_FAILURE;
        }

        dispatch(status);
      });
    },

    /**Get All Countries **/
    getAllCountries: () => new Promise((resolve, reject) => dispatch(getAllCountries()).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: FETCH_ALL_COUNTRIES_SUCCESS,
        message: data.message || FETCH_ALL_COUNTRIES_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = FETCH_ALL_COUNTRIES_FAILURE;
        status.message = data.message || FETCH_ALL_COUNTRIES_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    /**Get All Districts **/
    getAllDistricts: (params) => {
      dispatch(getAllDistricts(params)).then((response) => {
        let status = {
          payload: response.payload,
          type: FETCH_ALL_DISTRICTS_SUCCESS
        };

        if (response.error) {
          status.type = FETCH_ALL_DISTRICTS_FAILURE;
        }

        dispatch(status);
      });
    },

    /** Unfavorite advertisement**/
    unFavorite: (formData) => new Promise((resolve, reject) => dispatch(unFavorite(formData)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: UN_FAVORITE_SUCCESS,
        message: data.message || UN_FAVORITE_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = UN_FAVORITE_FAILURE;
        status.message = data.message || UN_FAVORITE_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);
