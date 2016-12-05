import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

/**
 * WebAd
 */
import AdvertisementReducer from './AdvertisementReducer';
import UserReducer from './UserReducer';
import SurveyReducer from './SurveyReducer';
import ActivityReducer from './ActivityReducer';
import TwitterReducer from './TwitterReducer';
import FacebookReducer from './FacebookReducer';

export default combineReducers({
  form: formReducer, // <-- redux-form
  routing: routerReducer, // Add the reducer to your store on the `routing` key 

  /**
   * WebAd
   */
  user: UserReducer,
  advertisement: AdvertisementReducer,
  survey: SurveyReducer,
  activity: ActivityReducer,
  twitter: TwitterReducer,
  facebook: FacebookReducer,
});
