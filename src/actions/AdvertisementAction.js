import httpClient from './Http';

// All advertisements
export const FETCH_ALL_ADVERTISEMENTS = 'FETCH_ALL_ADVERTISEMENTS';
export const FETCH_ALL_ADVERTISEMENTS_SUCCESS = 'FETCH_ALL_ADVERTISEMENTS_SUCCESS';
export const FETCH_ALL_ADVERTISEMENTS_FAILURE = 'FETCH_ALL_ADVERTISEMENTS_FAILURE';

// All categories
export const FETCH_ALL_CATEGORIES = 'FETCH_ALL_CATEGORIES';
export const FETCH_ALL_CATEGORIES_SUCCESS = 'FETCH_ALL_CATEGORIES_SUCCESS';
export const FETCH_ALL_CATEGORIES_FAILURE = 'FETCH_ALL_CATEGORIES_FAILURE';

// Filter by category
export const FETCH_ADVERTISEMENTS_BY_CATEGORY = 'FETCH_ADVERTISEMENTS_BY_CATEGORY';
export const FETCH_ADVERTISEMENTS_BY_CATEGORY_SUCCESS = 'FETCH_ADVERTISEMENTS_BY_CATEGORY_SUCCESS';
export const FETCH_ADVERTISEMENTS_BY_CATEGORY_FAILURE = 'FETCH_ADVERTISEMENTS_BY_CATEGORY_FAILURE';

// Filter by multiple criteria
export const FETCH_ADVERTISEMENTS_BY_CRITERIA = 'FETCH_ADVERTISEMENTS_BY_CRITERIA';
export const FETCH_ADVERTISEMENTS_BY_CRITERIA_SUCCESS = 'FETCH_ADVERTISEMENTS_BY_CRITERIA_SUCCESS';
export const FETCH_ADVERTISEMENTS_BY_CRITERIA_FAILURE = 'FETCH_ADVERTISEMENTS_BY_CRITERIA_FAILURE';

// Fetch advertisement detail
export const FETCH_ADVERTISEMENT_DETAIL = 'FETCH_ADVERTISEMENT_DETAIL';
export const FETCH_ADVERTISEMENT_DETAIL_SUCCESS = 'FETCH_ADVERTISEMENT_DETAIL_SUCCESS';
export const FETCH_ADVERTISEMENT_DETAIL_FAILURE = 'FETCH_ADVERTISEMENT_DETAIL_FAILURE';

// Like advertisement
export const LIKE_ADVERTISEMENT = 'LIKE_ADVERTISEMENT';
export const LIKE_ADVERTISEMENT_SUCCESS = 'LIKE_ADVERTISEMENT_SUCCESS';
export const LIKE_ADVERTISEMENT_FAILURE = 'LIKE_ADVERTISEMENT_FAILURE';
export const RESET_LIKE_ADVERTISEMENT = 'RESET_LIKE_ADVERTISEMENT';

// UnLike advertisement
export const UNLIKE_ADVERTISEMENT = 'UNLIKE_ADVERTISEMENT';
export const UNLIKE_ADVERTISEMENT_SUCCESS = 'UNLIKE_ADVERTISEMENT_SUCCESS';
export const UNLIKE_ADVERTISEMENT_FAILURE = 'UNLIKE_ADVERTISEMENT_FAILURE';

// Post comment advertisement
export const POST_COMMENT_ADVERTISEMENT = 'POST_COMMENT_ADVERTISEMENT';
export const POST_COMMENT_ADVERTISEMENT_SUCCESS = 'POST_COMMENT_ADVERTISEMENT_SUCCESS';
export const POST_COMMENT_ADVERTISEMENT_FAILURE = 'POST_COMMENT_ADVERTISEMENT_FAILURE';

// Fetch comment advertisement
export const FETCH_COMMENT_ADVERTISEMENT = 'FETCH_COMMENT_ADVERTISEMENT';
export const FETCH_COMMENT_ADVERTISEMENT_SUCCESS = 'FETCH_COMMENT_ADVERTISEMENT_SUCCESS';
export const FETCH_COMMENT_ADVERTISEMENT_FAILURE = 'FETCH_COMMENT_ADVERTISEMENT_FAILURE';

//Add to favorite
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const ADD_TO_FAVORITE_SUCCESS = 'ADD_TO_FAVORITE_SUCCESS';
export const ADD_TO_FAVORITE_FAILURE = 'ADD_TO_FAVORITE_FAILURE';

//un favorite
export const UN_FAVORITE = 'UN_FAVORITE';
export const UN_FAVORITE_SUCCESS = 'UN_FAVORITE_SUCCESS';
export const UN_FAVORITE_FAILURE = 'UN_FAVORITE_FAILURE';

export function fetchAllAdvertisements(params) {
  return {
    type: FETCH_ALL_ADVERTISEMENTS,
    payload: httpClient.get('/api/member/adv/all', {
      params,
    }),
  };
}

export function fetchAllCategories() {
  return {
    type: FETCH_ALL_CATEGORIES,
    payload: httpClient.get('/api/defaults/categories'),
  };
}

export function fetchAllAdvertisementsByCategory(params) {
  return {
    type: FETCH_ADVERTISEMENTS_BY_CATEGORY,
    payload: httpClient.get('/api/member/adv/category/' + params.category_id, {
      params
    }),
  };
}

export function filteringAdvertisementsByMultipleCriteria(props) {
  return {
    type: FETCH_ADVERTISEMENTS_BY_CRITERIA,
    payload: httpClient.post('/ad/getbytitle', props),
  };
}

export function fetchAdvertisementDetail(params) {
  return {
    type: FETCH_ADVERTISEMENT_DETAIL,
    payload: httpClient.get('/api/member/adv/info/' + params.id, {
      params,
    }),
  };
}

export function likeAdvertisement(props) {
  return {
    type: LIKE_ADVERTISEMENT,
    payload: httpClient.post('/api/member/adv/' + props.advertisement_id + '/post_activity?token=' + props.token, props),
  };
}

export function unlikeAdvertisement(props) {
  return {
    type: UNLIKE_ADVERTISEMENT,
    payload: httpClient.post('/api/member/adv/' + props.advertisement_id + '/post_activity?token=' + props.token, props),
  };
}

export function postCommentAdvertisement(props) {
  return {
    type: POST_COMMENT_ADVERTISEMENT,
    payload: httpClient.post('/api/member/adv/' + props.advertise_id + '/post_comment?token=' + props.token, props),
  };
}

export function fetchCommentAdvertisement(params) {
  return {
    type: FETCH_COMMENT_ADVERTISEMENT,
    payload: httpClient.get('/api/member/adv/' + params.advertise_id + '/comments', {
      params,
    }),
  };
}

export function addToFavorite(props) {
  return {
    type: ADD_TO_FAVORITE,
    payload: httpClient.post('/api/member/adv/' + props.advertisement_id + '/post_activity?token=' + props.token, props),
  };
}

export function unFavorite(props) {
  return {
    type: UN_FAVORITE,
    payload: httpClient.post('/api/member/adv/' + props.advertisement_id + '/post_activity?token=' + props.token, props),
  };
}
