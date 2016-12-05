import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Col, Grid } from 'react-bootstrap';

import BaseComponent from '../BaseComponent';
import { Form, FormGroup, FormLabel, FormError, Input } from '../ui/form/';
import { Button, ButtonGroup } from '../ui/button/';
import Alert from '../ui/Alert';

class UserLoginComponent extends BaseComponent {
  componentWillReceiveProps(nextProps) {
    const authentication = Object.assign({}, nextProps.user.authentication);
    if (authentication.status === 'authenticated' && !authentication.error) {
      this.context.router.push('/advertisement/list');
    }
  }

  componentWillUnmount(){
    this.props.user.authentication.error = false;
  }

  /**
  * View
  */
  render() {
    const {
      asyncValidating,
      submitting,
      handleSubmit,
      resetForm,
      fields: {
        email,
        password,
        rememberMe,
      },
      invalid,
    } = this.props;

    const { authentication } = this.props.user;
    if(authentication.error == true){
      var timeout = setTimeout(() => {
        authentication.error = false;
        clearTimeout(timeout);
      }, 1000);
    }

    return (
      <section id="user-login">
        <Grid>
          <Form className="form-horizontal form-login" handleSubmit={ handleSubmit(this.props.userLoginAPI.bind(this)) } role="form" noValidate>
            <Col mdOffset={1} className="form-login-heading">
              <h3>Dear Member,</h3>
              <p className="desc">Please login to enjoy the full benefits of this site.</p>
            </Col>
            <Col mdOffset={3} md={6} className="form-elements">
              <Alert isVisible={ submitting }>Loading...</Alert>
              <Alert isVisible={ authentication.error } status="error">{ authentication.message }</Alert>
              <FormGroup hasError={ !!(email.touched && email.error) }>
                <FormLabel className="col-md-3">User ID</FormLabel>
                <Col md={8}>
                  <Input type="email" fieldDefinition={ email }/>
                  <FormError isVisible={ !!(email.touched && email.error) }>
                    { email.error }
                  </FormError>
                  <FormError isVisible={ !!(email.touched && email.error && asyncValidating === 'username') }>
                  validating..
                  </FormError>
                </Col>
              </FormGroup>

              <FormGroup hasError={ !!(password.touched && password.error) }>
                <FormLabel className="col-md-3">Password</FormLabel>
                <Col md={8}>
                  <Input type="password" fieldDefinition={ password }/>
                  <FormError isVisible={ !!(password.touched && password.error) }>
                    { password.error }
                  </FormError>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col mdOffset={3} md={8} className="checkbox">
                  <FormLabel defaultClass={ false }>
                    <Input type="checkbox" defaultClass={ false } fieldDefinition={ rememberMe } /> Remember my password
                  </FormLabel>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col mdOffset={3} md={8}>
                  <Button type="submit" className="btn btn-lg btn-primary btn-block btn-login" disabled={ invalid || submitting }>Login</Button>
                </Col>
              </FormGroup>

              <Col mdOffset={3} md={8}>
                Not a member yet? <strong><Link to="/user/register">Register now</Link></strong> or <strong><Link to="/user/forgot-password">Forgot password</Link></strong>
              </Col>
            </Col>
          </Form>
        </Grid>
      </section>
    );
  }
}

export default UserLoginComponent;
