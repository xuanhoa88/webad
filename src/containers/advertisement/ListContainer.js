import {
  connect
} from 'react-redux';

import {

  // All advertisements
  fetchAllAdvertisements,
  FETCH_ALL_ADVERTISEMENTS_SUCCESS,
  FETCH_ALL_ADVERTISEMENTS_FAILURE,

  // All categories
  fetchAllCategories,
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_FAILURE,

  // Filter advertisements by criteria
  filteringAdvertisementsByMultipleCriteria,
  FETCH_ADVERTISEMENTS_BY_CRITERIA_SUCCESS,
  FETCH_ADVERTISEMENTS_BY_CRITERIA_FAILURE,

  //Add to favourite
  addToFavorite,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,
  unFavorite,
  UN_FAVORITE_SUCCESS,
  UN_FAVORITE_FAILURE,

  // Like advertisement
  likeAdvertisement,
  LIKE_ADVERTISEMENT_SUCCESS,
  LIKE_ADVERTISEMENT_FAILURE,

  // UnLike advertisement
  unlikeAdvertisement,
  UNLIKE_ADVERTISEMENT_SUCCESS,
  UNLIKE_ADVERTISEMENT_FAILURE
} from '../../actions/AdvertisementAction';

import AdvertisementListComponent from '../../components/advertisement/ListComponent';

const mapStateToProps = (state) => {
  return {
    // All advertisements
    advertisements: state.advertisement.advertisements,
    // All categories
    categories: state.advertisement.categories
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAdvertisements: (params) => {
      return new Promise((resolve, reject) => {
        dispatch(fetchAllAdvertisements(params)).then((response) => {
          let data = response.payload.data;

          // if any one of these exist, then there is a field error
          if (!data.status) {
            // let other components know of error by updating the redux` state
            dispatch({
              type: FETCH_ALL_ADVERTISEMENTS_FAILURE,
              payload: response.payload,
              message: FETCH_ALL_ADVERTISEMENTS_FAILURE,
            });

            // this is for redux-form itself
            reject(data);
          } else {

            // let other components know that we got user and things are fine by updating the redux` state
            dispatch({
              type: FETCH_ALL_ADVERTISEMENTS_SUCCESS,
              payload: response.payload,
              message: FETCH_ALL_ADVERTISEMENTS_SUCCESS,
            });

            // this is for redux-form itself
            resolve(data);
          }
        });
      });
    },

    fetchAllCategories: () => {
      dispatch(fetchAllCategories()).then((response) => {
        let status = {
          payload: response.payload,
          type: FETCH_ALL_CATEGORIES_SUCCESS
        };

        if (response.error) {
          status.type = FETCH_ALL_CATEGORIES_FAILURE;
        }

        dispatch(status);
      });
    },

    filteringAdvertisementsByMultipleCriteria: (props) => {
      dispatch(filteringAdvertisementsByMultipleCriteria(props)).then((response) => {
        let status = {
          payload: response.payload,
          type: FETCH_ADVERTISEMENTS_BY_CRITERIA_SUCCESS
        };

        if (response.error) {
          status.type = FETCH_ADVERTISEMENTS_BY_CRITERIA_FAILURE;
        }

        dispatch(status);
      });
    },

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
  }
}

export {
  mapStateToProps,
  mapDispatchToProps
};
export default connect(mapStateToProps, mapDispatchToProps)(AdvertisementListComponent);
