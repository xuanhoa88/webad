class jwtToken {
  setToken(accessToken) {
    localStorage.setItem('jwtToken', accessToken);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  loggedIn() {
    return !!this.getToken();
  }

  removeToken() {
    localStorage.removeItem('jwtToken');
  }
}

export const Authentication = new jwtToken();
export const requireAuth = (nextState, replace) => {
  if (!Authentication.loggedIn()) {
    // Remove token
    Authentication.removeToken();

    // Redirect to login screen
    replace({
      pathname: '/user/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    });
  }
};
