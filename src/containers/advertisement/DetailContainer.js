import {
  connect
} from 'react-redux';

import {
  // Advertisement detail
  fetchAdvertisementDetail,
  FETCH_ADVERTISEMENT_DETAIL_SUCCESS,
  FETCH_ADVERTISEMENT_DETAIL_FAILURE

  // Like advertisement
  ,
  likeAdvertisement,
  LIKE_ADVERTISEMENT_SUCCESS,
  LIKE_ADVERTISEMENT_FAILURE

  // UnLike advertisement
  ,
  unlikeAdvertisement,
  UNLIKE_ADVERTISEMENT_SUCCESS,
  UNLIKE_ADVERTISEMENT_FAILURE

  // Post comment advertisement
  ,
  postCommentAdvertisement,
  POST_COMMENT_ADVERTISEMENT_SUCCESS,
  POST_COMMENT_ADVERTISEMENT_FAILURE

  // Fetch comment advertisement
  ,
  fetchCommentAdvertisement,
  FETCH_COMMENT_ADVERTISEMENT_SUCCESS,
  FETCH_COMMENT_ADVERTISEMENT_FAILURE

  //Add to favourite
  ,
  addToFavorite,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_FAILURE
} from '../../actions/AdvertisementAction';

import {
  submitSurveyAnswers,
  SURVEY_QUIZ_SUCCESS,
  SURVEY_QUIZ_FAILURE,
  getCountdown,
  GET_COUNTDOWN_SUCCESS,
  GET_COUNTDOWN_FAILURE,
  submitAdvertisementAnswers,
  ADVERTISEMENT_QUIZ_SUCCESS,
  ADVERTISEMENT_QUIZ_FAILURE
} from '../../actions/SurveyAction';

import {
  shareOnSocialNetwok,
  SHARE_ON_SOCIAL_NETWORK_SUCCESS,
  SHARE_ON_SOCIAL_NETWORK_FAILURE,
  getCountdownShare,
  GET_COUNTDOWN_SHARE_SUCCESS,
  GET_COUNTDOWN_SHARE_FAILURE
} from '../../actions/ActivityAction';

import {
  tweetOnTwitter,
  TWEET_ON_TWITTER_SUCCESS,
  TWEET_ON_TWITTER_FAILURE,
} from '../../actions/social/TwitterAction';

import AdvertisementDetailComponent from '../../components/advertisement/DetailComponent';

const mapStateToProps = (state, ownProps) => {
  return {
    advertisementDetail: state.advertisement.advertisementDetail,
    advertisementLike: state.advertisement.advertisementLike,
    postComment: state.advertisement.postComment,
    fetchComment: state.advertisement.fetchComment,
    advertisementFavorite: state.advertisement.addToFavorite
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToFavorite: (props) => {
      return new Promise((resolve, reject) => {
        dispatch(addToFavorite(props)).then((response) => {
          let data = response.payload.data;
          let status = {
            payload: response.payload,
            type: ADD_TO_FAVORITE_SUCCESS,
            message: ADD_TO_FAVORITE_SUCCESS,
          };

          // If error occurred
          if (!data.status) {
            status.type = ADD_TO_FAVORITE_FAILURE;
            status.message = ADD_TO_FAVORITE_FAILURE;
          }

          dispatch(status);
          resolve(status);
        });
      });
    },

    fetchAdvertisementDetail: (props) => {
      dispatch(fetchAdvertisementDetail(props)).then((response) => {
        let data = response.payload.data;

        let status = {
          payload: response.payload,
          type: FETCH_ADVERTISEMENT_DETAIL_SUCCESS,
          message: FETCH_ADVERTISEMENT_DETAIL_SUCCESS,
        };

        if (!data.status) {
          status.type = FETCH_ADVERTISEMENT_DETAIL_FAILURE;
          status.message = FETCH_ADVERTISEMENT_DETAIL_FAILURE;
        }

        dispatch(status);
      });
    },

    fetchCommentAdvertisement: (params) => {
      dispatch(fetchCommentAdvertisement(params)).then((response) => {
        let data = response.payload.data;

        let status = {
          payload: response.payload,
          type: FETCH_COMMENT_ADVERTISEMENT_SUCCESS,
          message: FETCH_COMMENT_ADVERTISEMENT_SUCCESS,
        };

        if (!data.status) {
          status.type = FETCH_COMMENT_ADVERTISEMENT_FAILURE;
          status.message = FETCH_COMMENT_ADVERTISEMENT_FAILURE;
        }

        dispatch(status);
      });
    },

    likeAdvertisement: (formData) => new Promise((resolve, reject) => dispatch(likeAdvertisement(formData)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: LIKE_ADVERTISEMENT_SUCCESS,
        message: data.message || LIKE_ADVERTISEMENT_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = LIKE_ADVERTISEMENT_FAILURE;
        status.message = data.message || LIKE_ADVERTISEMENT_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    unlikeAdvertisement: (formData) => new Promise((resolve, reject) => dispatch(unlikeAdvertisement(formData)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: UNLIKE_ADVERTISEMENT_SUCCESS,
        message: data.message || UNLIKE_ADVERTISEMENT_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = UNLIKE_ADVERTISEMENT_FAILURE;
        status.message = data.message || UNLIKE_ADVERTISEMENT_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    postCommentAdvertisement: (formData) => {
      return new Promise((resolve, reject) => {
        dispatch(postCommentAdvertisement(formData)).then((response) => {
          let data = response.payload.data;

          // if any one of these exist, then there is a field error
          if (!data.status) {
            // let other components know of error by updating the redux` state
            dispatch({
              type: POST_COMMENT_ADVERTISEMENT_FAILURE,
              payload: response.payload,
              message: POST_COMMENT_ADVERTISEMENT_FAILURE,
            });

            // this is for redux-form itself
            reject(data);
          } else {

            // let other components know that we got user and things are fine by updating the redux` state
            dispatch({
              type: POST_COMMENT_ADVERTISEMENT_SUCCESS,
              payload: response.payload,
              message: POST_COMMENT_ADVERTISEMENT_SUCCESS,
            });

            // this is for redux-form itself
            resolve(data);
          }
        });
      });
    },

    submitSurveyAnswers: (formData) => new Promise((resolve, reject) => dispatch(submitSurveyAnswers(formData)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: SURVEY_QUIZ_SUCCESS,
        message: data.message || SURVEY_QUIZ_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = SURVEY_QUIZ_FAILURE;
        status.message = data.message || SURVEY_QUIZ_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    submitAdvertisementAnswers: (formData) => new Promise((resolve, reject) => dispatch(submitAdvertisementAnswers(formData)).then(response => {
      let data = response.payload.data;
      let status = {
        payload: response.payload,
        type: ADVERTISEMENT_QUIZ_SUCCESS,
        message: data.message || ADVERTISEMENT_QUIZ_SUCCESS,
      };

      // If error occurred
      if (!data.status) {
        status.type = ADVERTISEMENT_QUIZ_FAILURE;
        status.message = data.message || ADVERTISEMENT_QUIZ_FAILURE;
      }

      dispatch(status);
      resolve(status);
    })),

    getCountdown: (props) => {
      return new Promise((resolve, reject) => {
        dispatch(getCountdown(props)).then((response) => {
          let data = response.payload.data;

          // if any one of these exist, then there is a field error
          if (!data.status) {
            // let other components know of error by updating the redux` state
            dispatch({
              type: GET_COUNTDOWN_FAILURE,
              payload: response.payload,
              message: GET_COUNTDOWN_FAILURE,
            });

            // this is for redux-form itself
            reject(data);
          } else {

            // let other components know that we got user and things are fine by updating the redux` state
            dispatch({
              type: GET_COUNTDOWN_SUCCESS,
              payload: response.payload,
              message: GET_COUNTDOWN_SUCCESS,
            });

            // this is for redux-form itself
            resolve(data);
          }
        });
      });
    },

    getCountdownShare: (props) => {
      return new Promise((resolve, reject) => {
        dispatch(getCountdownShare(props)).then((response) => {
          let data = response.payload.data;

          // if any one of these exist, then there is a field error
          if (!data.status) {
            // let other components know of error by updating the redux` state
            dispatch({
              type: GET_COUNTDOWN_SHARE_FAILURE,
              payload: response.payload,
              message: GET_COUNTDOWN_SHARE_FAILURE,
            });

            // this is for redux-form itself
            reject(data);
          } else {

            // let other components know that we got user and things are fine by updating the redux` state
            dispatch({
              type: GET_COUNTDOWN_SHARE_SUCCESS,
              payload: response.payload,
              message: GET_COUNTDOWN_SHARE_SUCCESS,
            });

            // this is for redux-form itself
            resolve(data);
          }
        });
      });
    },

    shareOnSocialNetwok: (props) => {
      return new Promise((resolve, reject) => {
        dispatch(shareOnSocialNetwok(props)).then((response) => {
          let data = response.payload.data;

          // if any one of these exist, then there is a field error
          if (!data.status) {
            // let other components know of error by updating the redux` state
            dispatch({
              type: SHARE_ON_SOCIAL_NETWORK_FAILURE,
              payload: response.payload,
              message: SHARE_ON_SOCIAL_NETWORK_FAILURE,
            });

            // this is for redux-form itself
            reject(data);
          } else {

            // let other components know that we got user and things are fine by updating the redux` state
            dispatch({
              type: SHARE_ON_SOCIAL_NETWORK_SUCCESS,
              payload: response.payload,
              message: SHARE_ON_SOCIAL_NETWORK_SUCCESS,
            });

            // this is for redux-form itself
            resolve(data);
          }
        });
      });
    },

    tweetOnTwitter: (props) => {
      return dispatch(tweetOnTwitter(props)).then((response) => {
        let status = {
          payload: response.payload,
          type: TWEET_ON_TWITTER_SUCCESS
        };

        if (response.error) {
          status.type = TWEET_ON_TWITTER_FAILURE;
        }

        dispatch(status);
      });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertisementDetailComponent);
