import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Col, Grid, Row } from 'react-bootstrap';

import BaseComponent from '../BaseComponent';
import { Form, FormGroup, FormLabel, FormError, Input } from '../ui/form/';
import { Button, ButtonGroup } from '../ui/button/';
import Alert from '../ui/Alert';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


class UserRegisterComponent extends BaseComponent {

  /**
  * Constructor
  */
  constructor(...args) {
    // Invoke parent
    super(...args);

    // Binding
    this._responseFacebook = this._responseFacebook.bind(this);
    this._responseGoogleSuccess = this._responseGoogleSuccess.bind(this);
    this._responseGoogleFailure = this._responseGoogleFailure.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const authentication = Object.assign({}, nextProps.user.authentication);
    if (authentication.status === 'authenticated' && !authentication.error) {
      this.context.router.push('/advertisement/list');
    }
  }

  _responseFacebook(args){
    if(args.status != 'unknown'){
      this.props.registerFacebook({
        facebook_token: args.accessToken,
      });
    }
  }

  _responseGoogleSuccess(args){
    this.props.registerGoogle({
      google_token: args.accessToken,
    });
  }
  _responseGoogleFailure(args){
    console.log(args);
  }

  componentWillUnmount(){
    this.props.user.authentication.error = false;
  }

  render() {
    const {
      fields: {
        email,
        password,
        confirmPassword,
      },
      handleSubmit,
      submitting,
      resetForm,
      invalid,
    } = this.props;

    const { authentication } = this.props.user;

    return (
      <section id="user-register">
         <Grid>
            <Row>
               <Col mdOffset={3} md={6} className="form-social">
               <Col className="form-register-heading text-center">
               </Col>
               <h3>Dear Users</h3>
               <p>You could either register with</p>
               </Col>
               <Col className="social-register text-center" mdOffset={3} md={6}>
               <GoogleLogin
                  clientId={"463284192675-a0ed2p48kis58vic7n5cbciajasn70fa.apps.googleusercontent.com"}
                  buttonText="Register with Google"
                  onSuccess={ this._responseGoogleSuccess }
                  onFailure={ this._responseGoogleFailure }
                  className=" btn btn-lg btn-primary btn-block btn-social-register btn-google-register"
                  />
               <FacebookLogin
                  appId={process.env.FACEBOOK.APP_ID_LOGIN}
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={ this._responseFacebook }
                  cssClass="btn btn-lg btn-primary btn-block btn-social-register btn-facebook-register"
                  icon="fa-facebook"
                  textButton="Register with Facebook"
                  />
               </Col>
               <Col mdOffset={3} md={6} className="or text-center">
               <h3>Or</h3>
               </Col>
               <Form className="form-horizontal form-register" handleSubmit={ handleSubmit(this.props.userRegisterAPI.bind(this)) } role="form" noValidate>
               <Col mdOffset={3} md={6} className="form-elements">
               <Alert isVisible={ submitting }>Loading...</Alert>
               <Alert isVisible={ authentication.error } status="error">{ authentication.message }</Alert>
               <FormGroup hasError={ !!(email.touched && email.error) }>
               <FormLabel className="col-md-3">Email</FormLabel>
               <Col md={8}>
               <Input type="text" fieldDefinition={ email } />
               <FormError isVisible={ !!(email.touched && email.error) }>
               { email.error }
               </FormError>
               </Col>
               </FormGroup>
               <FormGroup hasError={ !!(password.touched && password.error) }>
               <FormLabel className="col-md-3">Password</FormLabel>
               <Col md={8}>
               <Input type="password" fieldDefinition={ password } />
               <FormError isVisible={ !!(password.touched && password.error) }>
               { password.error }
               </FormError>
               </Col>
               </FormGroup>
               <FormGroup hasError={ !!(confirmPassword.touched && confirmPassword.error) }>
               <FormLabel className="col-md-3">Confirm Password</FormLabel>
               <Col md={8}>
               <Input type="password" fieldDefinition={ confirmPassword } />
               <FormError isVisible={ !!(confirmPassword.touched && confirmPassword.error) }>
               { confirmPassword.error }
               </FormError>
               </Col>
               </FormGroup>
               <FormGroup>
                  <Col mdOffset={3} md={8}>
                  <Button type="submit" className="btn btn-lg btn-primary btn-block btn-register" disabled={ invalid || submitting }>Register</Button>
                  </Col>
               </FormGroup>
               </Col>
               </Form>
            </Row>
         </Grid>
      </section>
    );
  }
}

export default UserRegisterComponent;
