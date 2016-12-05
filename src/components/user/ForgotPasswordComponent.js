import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Col, Panel } from 'react-bootstrap';
import Alert from '../ui/Alert';

export default class UserForgotPasswordComponent extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  /**
   * Constructor
   */
  constructor(...args) {
    super(...args);

    this.state = {
      showAlert: false
    };
  }

  render() {
    const {
      forgotPwd,
      asyncValidating,
      fields: {
        email
      },
      handleSubmit,
      submitting,
      user
    } = this.props;

    const {
      resetpassword
    } = this.props.user;
    if (resetpassword != undefined) {
      var timeout = setTimeout(() => {
        resetpassword.status = false;
        clearTimeout(timeout);
      }, 1000);
    }

    return (
      <div className = "container">
        <Col md={12}>
          <Panel className = "form-reset-password" header = { 'Reset Password' }>
            <Alert isVisible = {resetpassword && resetpassword.status && resetpassword.payload && resetpassword.payload.message == 'The selected email is invalid.'} status = "error" > The selected email is invalid. < /Alert>
            <Alert isVisible = {resetpassword && resetpassword.status && resetpassword.payload.message != 'The selected email is invalid.'}status = "success" > Reset password successfully.Please check your email! < /Alert>
            <form onSubmit = {handleSubmit(this.props.userResetPasswordAPI.bind(this))} >
              <div className = {`form-group ${email.touched && email.invalid ? 'has-error' : ''}`}>
                <label className = "control-label" > E - Mail Address * < /label>
                <input type = "email" className = "form-control" {...email }/>
                <div className = "help-block" > {email.touched ? email.error : ''} </div>
              </div >
              <button type = "submit" className = "btn btn-primary" disabled = { submitting } > Submit < /button>
              <Link to = "/" className = "btn btn-error" > Cancel < /Link>
            </form >
          </Panel>
        </Col>
      </div>
    );
  }
}
