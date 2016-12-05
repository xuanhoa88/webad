import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

import './styles/styles.css';

// Add the reducer to your store on the `routing` key
const store = configureStore({});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Simply listen to the enhanced history via history.listen. 
// This takes in a function that will receive a location any time the store updates. 
// This includes any time travel activity performed on the store.
history.listen(location => {
  // TODO
});

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history } routes={ routes } />
  </Provider>
  , document.getElementById('app'));
