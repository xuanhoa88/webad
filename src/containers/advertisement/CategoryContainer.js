import {
  connect
} from 'react-redux';

import {
  fetchAllAdvertisementsByCategory,
  FETCH_ADVERTISEMENTS_BY_CATEGORY_SUCCESS,
  FETCH_ADVERTISEMENTS_BY_CATEGORY_FAILURE,
} from '../../actions/AdvertisementAction';

import {
  mapStateToProps,
  mapDispatchToProps as pMapDispatchToProps
} from './ListContainer';
import AdvertisementCategoryComponent from '../../components/advertisement/CategoryComponent';

const mapDispatchToProps = (dispatch) => {
  return Object.assign(pMapDispatchToProps(dispatch), {
    fetchAllAdvertisementsByCategory: (props) => {
      return new Promise((resolve, reject) => {
        dispatch(fetchAllAdvertisementsByCategory(props)).then((response) => {
          let data = response.payload.data;

          // if any one of these exist, then there is a field error
          if (!data.status) {
            // let other components know of error by updating the redux` state
            dispatch({
              type: FETCH_ADVERTISEMENTS_BY_CATEGORY_FAILURE,
              payload: response.payload,
              message: FETCH_ADVERTISEMENTS_BY_CATEGORY_FAILURE,
            });

            // this is for redux-form itself
            reject(data);
          } else {

            // let other components know that we got user and things are fine by updating the redux` state
            dispatch({
              type: FETCH_ADVERTISEMENTS_BY_CATEGORY_SUCCESS,
              payload: response.payload,
              message: FETCH_ADVERTISEMENTS_BY_CATEGORY_SUCCESS,
            });

            // this is for redux-form itself
            resolve(data);
          }
        });
      });
    },
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvertisementCategoryComponent);
