import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import logger from './logger';

const __DEV__ = !(process.env.NODE_ENV === 'production');

const _getMiddleware = () => {
  let middleware = [
    routerMiddleware(browserHistory),
    promise,
  ];

  if (__DEV__) {
    middleware.push(thunk);
    middleware.push(logger);
  }

  return applyMiddleware(...middleware);
};

const _getEnhancers = () => {
  let enhancers = [];
  if (__DEV__ && window.devToolsExtension) {
    enhancers = [...enhancers, window.devToolsExtension() ];
  }

  return enhancers;
};

const _enableHotLoader = (store) => {
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
};

export default (initialState) => {
  const store = compose(_getMiddleware(), ..._getEnhancers())(createStore)(reducer, initialState);

  _enableHotLoader(store);

  return store;
}