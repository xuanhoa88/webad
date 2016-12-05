import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { requireAuth } from './libraries/Authentication';

import AppPage from './pages/AppPage';
import DashboardPage from './pages/DashboardPage';

/**
 * Advertisement
 */
import AdvertisementListPage from './pages/advertisement/ListPage';
import AdvertisementCategoryPage from './pages/advertisement/CategoryPage';
import AdvertisementDetailPage from './pages/advertisement/DetailPage';

/**
 * User
 */
import UserLoginPage from './pages/user/LoginPage';
import UserForgotPasswordPage from './pages/user/ForgotPasswordPage';
import UserProfilePage from './pages/user/ProfilePage';
import UserRegisterPage from './pages/user/RegisterPage';

export default (
  <Route path="/" component={ AppPage }>

    <IndexRoute component={ AdvertisementListPage } onEnter={ requireAuth } />

    <Route path="/advertisement/list" component={ AdvertisementListPage } />
    <Route path="/advertisement/category/:id" component={ AdvertisementCategoryPage } />
    <Route path="/advertisement/:id" component={ AdvertisementDetailPage } />

    <Route path="/user/login" component={ UserLoginPage } />
    <Route path="/user/forgot-password" component={ UserForgotPasswordPage } />
    <Route path="/user/profile" component={ UserProfilePage } onEnter={ requireAuth } />
    <Route path="/user/register" component={ UserRegisterPage } />
  </Route>
);
