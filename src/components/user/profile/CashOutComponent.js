import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Navbar, Nav, Col, Grid, Row, Well, Button, PageHeader, Clearfix, Table, Tabs, Tab } from 'react-bootstrap';

import { Form, FormGroup, FormLabel, FormError, Input, Select } from '../../ui/form/';
import Alert from '../../ui/Alert';
import { Validator } from '../../../components/ui/form';
import BaseComponent from '../../BaseComponent';

class UserCashOutComponent extends BaseComponent {

  /**
   * Constructor
   */
  constructor(...args) {
    super(...args);

    this.state = {
      _formLoading: false,
      AlertError: false,
      AlertSucceed: false
    };
  }

  /**
   * View
   */
  render() {
    const {
      handleSubmit,
      fields: {
        //method,
        amount,
        email,
        balance,
      },
      values,
      dirty,
      invalid,
      user: {
          cashOut,
      },
    } = this.props;

    let user_balance = this.props.user.balance.payload.data.balance;

    // Invoke API
    const onSave = (formData) => {
    this.setState({
      _formLoading: true,
      AlertError: true,
      AlertSucceed: true
    });

    formData.token = this.context.authentication.getToken();
      this.props.fetchAllUserCashOut(formData).then(r => {
        this.setState({
          _formLoading: false
        });
        if (r.payload.data.status) {
          var timeout = setTimeout(() => {
            this.setState({
              AlertSucceed: false
            });
            this.props.fetchAllUserBalance({
              token: this.context.authentication.getToken(),
            });
            this.props.switchTab('default');
            clearTimeout(timeout);
          }, 5000);
        } else {
          var timeout = setTimeout(() => {
            this.setState({
              AlertError: false
            });
            clearTimeout(timeout);
          }, 5000);
        }

      });
    };

    // Change method value
    const _methodChange = (_methodVal, event) => {
        method.onChange(_methodVal);
    };

    // Render
    return (
      <Col md={10} mdOffset={1}>
        <Well>
          <Form className="form-horizontal" handleSubmit={ handleSubmit(onSave.bind(this)) } role="form" noValidate>
            <Alert isVisible={ this.state._formLoading }>Transferring...</Alert>
            { cashOut && !this.state._formLoading && !cashOut.loading &&
              (<div><Alert isVisible={ cashOut.error && this.state.AlertError} status="error">{ cashOut.message }</Alert>
              <Alert isVisible={ !cashOut.error && this.state.AlertSucceed} status="success">Your request is created. Wait for admin review this request.</Alert></div>)
            }
            <Input type="hidden" fieldDefinition={ balance } />
            <FormGroup hasError={ !!(amount.touched && amount.error) }>
              <FormLabel className="col-md-3 text-right">Amount</FormLabel>
              <Col md={9}>
                <Input type="text" fieldDefinition={ amount } />
                <FormError isVisible={ !!(amount.touched && amount.error) }>
                  { amount.error }
                </FormError>
              </Col>
            </FormGroup>

            <FormGroup hasError={ !!(email.touched && email.error) }>
              <FormLabel className="col-md-3 text-right">Email Address</FormLabel>
              <Col md={9}>
                <Input type="text" fieldDefinition={ email } />
                <FormError isVisible={ !!(email.touched && email.error) }>
                  { email.error }
                </FormError>
              </Col>
            </FormGroup>
            <Button type="submit" bsSize="large" className="btn-cash-out pull-right" disabled={ invalid || !dirty }>Confirm</Button>
            <Clearfix />
          </Form>
        </Well>
      </Col>
    );
  }
}

UserCashOutComponent.propTypes = {
  switchTab: PropTypes.func.isRequired
};

const validate = (data) => {
  let vv = Validator.make({
    data,
    rules: {
      balance: 'required',
      amount: 'required|numeric|check_amount',
      email: 'required|email',
    },
    names: {
      balance: 'Balance',
      amount: 'Amount',
      email: 'Email',
    },
  });
  if(data['balance'] < 10){
    vv.addMessage('check_amount', 'User balance must be at least S$10 to Cash out');
  }else{
    vv.addMessage('check_amount', 'Amount must be from S$10 to S$' + data['balance']);
  }
  vv.addValidate('check_amount', (name, value, params) => {
    return (value >= 10 && value <= data['balance'])
  });

  let hasErrors, errors;
  if (hasErrors = vv.fails()) {
    errors = vv.firstErrors;
  }

  return hasErrors && errors;
}

export default reduxForm({
  form: 'userCashOutForm',
  fields: ['amount', 'email', 'balance'],
  destroyOnUnmount: true,
  validate,
})(UserCashOutComponent)
