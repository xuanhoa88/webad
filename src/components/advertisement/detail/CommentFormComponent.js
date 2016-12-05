import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Col, Grid, Row, Button } from 'react-bootstrap';

import { Form, FormGroup, FormLabel, FormError, Textarea } from '../../ui/form/';
import Alert from '../../ui/Alert';
import { Validator } from '../../../components/ui/form';
import BaseComponent from '../../BaseComponent';
import SweetAlert from 'sweetalert-react';

class AdvertisementDetailCommentFormComponent extends BaseComponent {
  /**
   * Constructor
   */
  constructor(...args) {
    super(...args);
    this.state = {
      _formLoading: false,
      autoShowMsg: false,
      showAlertLogin: false
    };
  }

  /**
   * Comment
   */
  _submitComment(formData) {
    this.props.postCommentAdvertisement({
      advertise_id: this.props.params.id,
      token: this.context.authentication.getToken(),
      comment: formData.comment,
    }).then(response => {
      // Reset form
      this.props.resetForm();
      // Reload list comment
      this.props.fetchCommentAdvertisement({
        advertise_id: this.props.params.id,
        token: this.context.authentication.getToken(),
      });
    });
  }

  /**
   * View
   */
  render() {
    if (this.props.hidden) {
      return <div />;
    }

    const {
      handleSubmit,
      fields: {
          comment,
      },
      values,
      dirty,
      invalid,
      postComment,
      submitting,
    } = this.props;

    const onSave = (formData) => {
      if(this.context.authentication.getToken() == null){
        this.setState({
            showAlertLogin: true
        })
      }else{
        this.setState({
          autoShowMsg: true,
          _formLoading: false,
        });
        this.props.postCommentAdvertisement({
          advertise_id: this.props.params.id,
          token: this.context.authentication.getToken(),
          comment: formData.comment,
          parent_id: this.props.pId,
        }).then(response => {
          this.setState({
            _formLoading: false,
          });

          // Reset form
          this.props.resetForm();

          // Reload list comment
          this.props.fetchCommentAdvertisement({
            advertise_id: this.props.params.id,
            token: this.context.authentication.getToken(),
          });

          var timeout = setTimeout(() => {
            this.setState({
              autoShowMsg: false,
            });
            clearTimeout(timeout);
          }, 2000);
        });
      }
    };

    return (
      <div id="comment-box">
        <Form handleSubmit={ handleSubmit(onSave.bind(this)) } role="form" noValidate>
          <Alert isVisible={ this.state._formLoading }>Posting...</Alert>
          { postComment && !this.state._formLoading && !postComment.loading &&
              (<div>
                  <Alert isVisible={ postComment.error } status="error">{ postComment.message }</Alert>
                  <Alert isVisible={ !postComment.error && this.state.autoShowMsg } status="success">Your comment has been sent successfully</Alert>
              </div>)
          }
          <FormGroup>
            <Textarea rows={ this.props.rows } fieldDefinition={ comment } placeholder="Enter your comment here" />
          </FormGroup>
          <FormGroup>
              <Button type="submit" className="btn btn-lg btn-primary btn-post-comment" disabled={ invalid || submitting }>Submit</Button>
          </FormGroup>
        </Form>
        <SweetAlert
          show={this.state.showAlertLogin}
          type="error"
          title="You must login to use this function!"
          onConfirm={() => this.setState({ showAlertLogin: false })}/>
      </div>
    );
  }
}

AdvertisementDetailCommentFormComponent.propTypes = {
  id: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  rows: PropTypes.number.isRequired,
  commentId: PropTypes.string,
};

AdvertisementDetailCommentFormComponent.defaultProps = {
  hidden: true,
  rows: 2,
};

const validate = (data) => {
  let vv = Validator.make({
    data,
    rules: {
      comment: 'required',
    },
    names: {
      comment: 'Comment',
    }
  });

  let hasErrors, errors;
  if (hasErrors = vv.fails()) {
    errors = vv.firstErrors;
  }
  return hasErrors && errors;
};

export default reduxForm({
  form: 'advertiseDetailCommentForm',
  fields: ['comment'],
  destroyOnUnmount: true,
  validate,
})(AdvertisementDetailCommentFormComponent)
