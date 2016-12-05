import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

import BaseComponent from './BaseComponent';
import { NavItem, MenuItem } from './ui/navigator';

// Fix when built to static file
const NavbarHeader = Navbar.Header;
const NavbarBrand = Navbar.Brand;
const NavbarCollapse = Navbar.Collapse;
const NavbarToggle = Navbar.Toggle;

class HeaderComponent extends BaseComponent {
  /**
  * Constructor
  */
  constructor(...args) {
    super(...args);

    // Set default state
    this.state.loggedIn = this.context.authentication.loggedIn();
  }

  /**
   * Call method remove token on server
   */
  _logout() {

    this.props.logout({
      token: this.context.authentication.getToken(),
    }).then(()=> {
      // Remove client token
      this.context.authentication.removeToken();

      // Update state
      //this._updateAuth(this.context.authentication.loggedIn());

      // Redirect to login page
      this.context.router.push('/user/login');
    });
  }

  /**
   * Update token state
   */
  _updateAuth(loggedIn) {
    this.setState({
      loggedIn,
    });
  }

  /**
   * Generate menu when unauthenticated user
   */
	_menuUnauthenticated() {
    return (
      <Nav pullRight>
        <NavItem eventKey="1"><Link to="/user/login">Login</Link></NavItem>
        <NavItem eventKey="2"><Link to="/user/register">Register</Link></NavItem>
        <NavItem eventKey="3"><Link to="/user/contact-us">Contact us</Link></NavItem>
        <NavItem eventKey="4"><Link to="/help">Help</Link></NavItem>
      </Nav>
    );
	};

  /**
   * Generate menu when authenticated user
   */
	_menuAuthenticated() {
    const { profile } = this.props.user;
    const _renderName = (data) => {
      if (data != undefined) {
        if (data.first_name != '') {
          return data.first_name + ' ' + data.last_name;
        } else {
          return data.email;
        }
      } else {
        return 'Username is loading...';
      }
    };
    return (
      <Nav pullRight>
        <NavItem eventKey="1"><Link to="/user/profile">{ profile.payload && profile.payload.data ? _renderName(profile.payload.data) : 'Username is loading...' }</Link></NavItem>
        <NavItem eventKey="2"><a onClick={ this._logout.bind(this) } href="javascript:void(0)">Logout</a></NavItem>
        <NavItem eventKey="3"><Link to="/contact-us">Contact us</Link></NavItem>
        <NavItem eventKey="4"><Link to="/help">Help</Link></NavItem>
      </Nav>
    );
	};

	render() {
    return (
      <Navbar staticTop>
        <NavbarHeader>
          <NavbarBrand><Link to="/advertisement/list">Home</Link></NavbarBrand>
          <NavbarToggle />
        </NavbarHeader>
        <NavbarCollapse>
          { this.state.loggedIn ? this._menuAuthenticated() : this._menuUnauthenticated() }
        </NavbarCollapse>
      </Navbar>
    );
	}
}

export default HeaderComponent;
