import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Col, Grid, Row, Button } from 'react-bootstrap';

import { Form, FormGroup, FormLabel, FormError, Textarea, Input } from '../../ui/form/';
import Alert from '../../ui/Alert';
import { Validator } from '../../../components/ui/form';
import BaseComponent from '../../BaseComponent';
import SweetAlert from 'sweetalert-react';

class AdvertisementDetailShareEmailFormComponent extends BaseComponent {

  /**
   * Constructor
   */
  constructor(...args) {
    super(...args);
    this.state.showAlert = this.props.showAlert;
  }

  /**
   * View
   */
  render() {
    const {
      handleSubmit,
      fields: {
          name,
          email,
      },
      values,
      dirty,
      invalid,
      submitting,
    } = this.props;

    return (
      <Form handleSubmit={ handleSubmit(this.props.onSave.bind(this)) } role="form" noValidate>
        <FormGroup hasError={ !!(name.touched && name.error) }>
          <Input type="text" fieldDefinition={ name } placeholder="Enter name of person you want to share" />
        </FormGroup>
        <FormError isVisible={ !!(name.touched && name.error) }>
          { name.error }
        </FormError>
        <FormGroup hasError={ !!(email.touched && email.error) }>
          <Input type="text" fieldDefinition={ email } placeholder="Enter your email to share" />
        </FormGroup>
        <FormError isVisible={ !!(email.touched && email.error) }>
          { email.error }
        </FormError>
        <FormGroup>
          <Button type="submit" className="btn btn-primary" disabled={ invalid }>Submit</Button>
        </FormGroup>
        <SweetAlert show={this.state.showAlert}
            type="success"
            title="Share successfully!"
            onConfirm={() => this.setState({ showAlert: false })}/>
      </Form>
    );
  }
}

const validate = (data) => {
  let vv = Validator.make({
    data,
    rules: {
      name: 'required',
      email: 'required|email'
    },
    names: {
      name: 'Name',
      email: 'Email'
    }
  });

  let hasErrors, errors;
  if (hasErrors = vv.fails()) {
    errors = vv.firstErrors;
  }

  return hasErrors && errors;
};

export default reduxForm({
  form: 'AdvertisementDetailShareEmailForm',
  fields: ['name', 'email'],
  destroyOnUnmount: true,
  validate,
})(AdvertisementDetailShareEmailFormComponent)
