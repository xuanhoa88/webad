import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, Col, Grid, Row } from 'react-bootstrap';

import BaseComponent from './BaseComponent';
import { NavItem, MenuItem } from './ui/navigator';

class FooterComponent extends BaseComponent {
	render() {
    return (
      <footer className="footer">
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <Col md={4}>
                <h3>Curiocity.sg</h3>
                <Nav bsStyle="pills" stacked>
                  <NavItem><Link to="/about-us">About Us</Link></NavItem>
                  <NavItem><Link to="/user/register">Join Us</Link></NavItem>
                  <NavItem><Link to="/user/login">Terms &amp; Conditions</Link></NavItem>
                </Nav>
              </Col>
              <Col md={4}>
                <h3>Help Center</h3>
                <Nav bsStyle="pills" stacked>
                  <NavItem><Link to="/faq">FAQ</Link></NavItem>
                  <NavItem><Link to="/policy">Policy</Link></NavItem>
                  <NavItem><Link to="/payment">Payment</Link></NavItem>
                </Nav>
              </Col>
              <Col md={4}>
                <h3>Contact Us</h3>
                <Nav bsStyle="pills" stacked>
                  <NavItem><a href="javascript:void(0)"><span className="glyphicon glyphicon-map-marker" aria-hidden="true"> Handerson Street S122345</span></a></NavItem>
                  <NavItem><a href="javascript:void(0)"><span className="glyphicon glyphicon-earphone" aria-hidden="true"> 8888 6666</span></a></NavItem>
                  <NavItem><a href="javascript:void(0)"><span className="glyphicon glyphicon-envelope" aria-hidden="true"> curiocity@sg.com</span></a></NavItem>
                </Nav>
              </Col>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
	}
}

export default FooterComponent;

