import {
  connect
} from 'react-redux';

import {

  // All user reward histories
  fetchAllUserRewardHistory,
  FETCH_ALL_USER_REWARD_HISTORY_SUCCESS,
  FETCH_ALL_USER_REWARD_HISTORY_FAILURE,

} from '../../actions/user/RewardHistoryAction';

import UserRewardHistoryComponent from '../../components/user/RewardHistoryComponent';

const mapStateToProps = (state) => {
  return {
    // User reward histories
    userRewardHistories: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserRewardHistory: () => dispatch(fetchAllUserRewardHistory()).then((response) => {
      let status = {
        payload: response.payload,
        type: FETCH_ALL_USER_REWARD_HISTORY_SUCCESS
      };

      if (!response.status) {
        status.type = FETCH_ALL_USER_REWARD_HISTORY_FAILURE;
      }

      dispatch(status);
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRewardHistoryComponent);
