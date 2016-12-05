import React from 'react';
import { reduxForm } from 'redux-form';
import { Navbar, Nav, Col, Grid, Row, Button, PageHeader, Clearfix, Table, Tabs, Tab } from 'react-bootstrap';

import { Form, FormGroup, FormLabel, FormError, Input, Select } from '../../ui/form/';
import Alert from '../../ui/Alert';
import { Validator } from '../../../components/ui/form';
import BaseComponent from '../../BaseComponent';
import userAvatar from '../../../styles/assets/user_avatar.png';
import DatePicker from 'react-bootstrap-date-picker';

class UserInformationComponent extends BaseComponent {

  /**
   * Constructor
   */
  constructor(...args) {
    super(...args);

    this.state._formLoading = false;
    this._fileUpload = undefined;
    this.state.imagePreviewUrl = '';
    this.state.hideAvatar = '';
    let birthday = this.props.user.profile.payload.data.birthday;
    if(birthday != '0000-00-00'){
      this.state.birthday = birthday;
    }else {
      this.state.birthday = '1900-01-01';
    }
  }

  /**
   * Autoload from service
   */
  componentWillMount() {
    this.props.getAllOccupations();
    this.props.getAllCountries().then(response => {
      this.props.getAllDistricts({
        country_id: response.payload.data.data[0].id,
      });
    });
  }

  _handleImageChange(e) {
    e.preventDefault();
    this.props.fields.avatar.onChange(e.target);
    this._fileUpload = e.target.files[0];

    //preview
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        hideAvatar: 'user_avatar'
      });
    }

    reader.readAsDataURL(this._fileUpload)
  }

  handleChangeBirthday(value) {
    this.setState({
      birthday: value
    });
  }

  deleteBirthday() {
    this.setState({
      birthday: ''
    });
  }

  /**
  /* Get all district by country
  */

  getAllDistricts(event){
    this.props.getAllDistricts({
      country_id: event.target.value,
    });
  }

  /**
   * View
   */
  render() {
    const {
      handleSubmit,
      fields: {
        username,
        phone_number,
        //birthday,
        gender,
        occupation_id,
        avatar,
        first_name,
        last_name,
        area_id
      },
      values,
      dirty,
      invalid,
      user: {
          updateProfile,
          occupations,
          countries,
          districts
      },
    } = this.props;

    const onSave = (_formData) => {
      this.setState({_formLoading: true});
      var formData = new FormData();
      for (let _field in _formData) {
        if(_field != 'occupation_id' || (_field == 'occupation_id' && _formData[_field] != '')){
          formData.append(_field, _formData[_field]);
        }
        if(_field == 'area_id' && _formData[_field] == ''){
          formData.append(_field, this.props.user.districts.payload.data[0].id);
        }
      }
      if(this.state.birthday != null){
        formData.append('birthday', this.state.birthday.slice(0,10));
      }else {
        formData.append('birthday', '1900-01-01');
      }
      if(typeof this._fileUpload == 'object'){
        formData.append('avatar', this._fileUpload);
      }else{
        formData.append('avatar', '');
      }

      this.props.onSave(formData).then(() => this.setState({_formLoading: false}));
    };

    const _renderOccupations = (_occupations) => {
      if (_occupations && _occupations.payload && Array.isArray(_occupations.payload.data)) {
        return _occupations.payload.data.map(item => {
          return (
            <option value={ item.id } key={ item.id }>{ item.name }</option>
          );
        });
      }
    };

    const _renderCountries = (_countries) => {
      if (_countries && _countries.payload && Array.isArray(_countries.payload.data)) {
        return _countries.payload.data.map(item => {
          return (
            <option value={ item.id } key={ item.id }>{ item.name }</option>
          );
        });
      }
    };

    const _renderDistricts = (_districts) => {
      if (_districts && _districts.payload && Array.isArray(_districts.payload.data)) {
        return _districts.payload.data.map(item => {
          return (
            <option value={ item.id } key={ item.id }>{ item.name + ' AREA' }</option>
          );
        });
      }
    };

    const _renderAvatar = (avatar) => {
      if (avatar != undefined) {
        return (
          <img src= {process.env.API + 'assets/' + avatar} className="img-responsive" id={ this.state.hideAvatar }/>
        )
      }else{
        return(
          <img src= { userAvatar } className="img-responsive user-avatar" id={ this.state.hideAvatar }/>
        )
      }
    };

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} id="preview-avatar"/>)
    }

    return (
      <Form className="form-horizontal clearfix" encType="multipart/form-data" handleSubmit={ handleSubmit(onSave.bind(this)) } role="form" noValidate>
        <Col>
          <Col sm={4} md={2}>
            <div className="imgPreview">
              {$imagePreview}
            </div>
            {/*
                <img src= {(process.env.API + 'assets/' + values.avatar) || userAvatar} alt={ values.email } className="img-responsive" id={ this.state.hideAvatar }/>
            */}
            <div className="avatar">
              {_renderAvatar(values.avatar)}
              { values.name && <p>{ values.name }</p> }
              <label htmlFor="user-avatar" className="pull-right"><i className="fa fa-camera"></i></label>
              <Input type="file" accept="image/*" id="user-avatar" fieldDefinition={ avatar } onChange={ this._handleImageChange.bind(this) } value={ undefined } />
            </div>
          </Col>
          <Col sm={8} md={10}>
            <Row className="row-profile">
              <Col md={5}>
                <Alert isVisible={ this.state._formLoading }>Saving...</Alert>
                { updateProfile && !this.state._formLoading && !updateProfile.loading &&
                  (<div><Alert isVisible={ updateProfile.error } status="error">{ updateProfile.message }</Alert>
                    <Alert isVisible={ !updateProfile.error } status="success">Successfully</Alert></div>)
                }

                <FormGroup hasError={ !!(username.touched && username.error) }>
                  <FormLabel className="col-md-1 col-xs-1 text-right"><i className="glyphicon glyphicon-user"></i></FormLabel>
                  <Col md={11} xs={11}>
                    <Input type="text" fieldDefinition={ username } placeholder="Nickname"/>
                    <FormError isVisible={ !!(username.touched && username.error) }>
                      { username.error }
                    </FormError>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <FormLabel className="col-md-1 col-xs-1 text-right"><i className="glyphicon glyphicon-user"></i></FormLabel>
                  <Col md={5} xs={11}>
                    <Input type="text" fieldDefinition={ first_name } placeholder="First name"/>
                    <FormError isVisible={ !!(first_name.touched && first_name.error) }>
                      { first_name.error }
                    </FormError>
                  </Col>
                  <Col md={5} xs={11} mdOffset={1} className="last-name">
                    <Input type="text" fieldDefinition={ last_name } placeholder="Last name"/>
                    <FormError isVisible={ !!(last_name.touched && last_name.error) }>
                      { last_name.error }
                    </FormError>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <FormLabel className="col-md-1 col-xs-1 text-right"><i className="glyphicon glyphicon-phone"></i></FormLabel>
                  <Col md={11} xs={11}>
                    <Input type="text" fieldDefinition={ phone_number } placeholder="Phone number"/>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <FormLabel className="col-md-1 col-xs-1 text-right"><i className="glyphicon glyphicon-gift"></i></FormLabel>
                  <Col md={11} xs={11}>
                    <DatePicker value={ this.state.birthday } onChange={ this.handleChangeBirthday.bind(this) } onClear= { this.deleteBirthday.bind(this) } />
                  </Col>
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <FormLabel className="col-md-1 col-xs-1 text-right"><i className="glyphicon glyphicon-map-marker"></i></FormLabel>
                  <Col md={5} xs={11}>
                    <Select onChange={ this.getAllDistricts.bind(this)}>
                      { _renderCountries(countries) }
                    </Select>
                  </Col>
                  <Col md={6} className="district">
                    <Select fieldDefinition={ area_id } value={ values.area_id }>
                      { _renderDistricts(districts) }
                    </Select>
                  </Col>
                </FormGroup>
                <FormGroup hasError={ !!(gender.touched && gender.error) }>
                  <FormLabel className="col-md-3">Gender</FormLabel>
                  <Col md={9}>
                    <label className="radio-inline">
                      <Input type="radio" name="gender" value="1" defaultClass={ false } fieldDefinition={ gender } checked={ values.gender == '1' } /> Male
                    </label>
                    <label className="radio-inline">
                      <Input type="radio" name="gender" value="2" defaultClass={ false } fieldDefinition={ gender } checked={ values.gender == '2' } /> Female
                    </label>
                    <FormError isVisible={ !!(gender.touched && gender.error) }>
                      { gender.error }
                    </FormError>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <FormLabel className="col-md-3">Occupation</FormLabel>
                  <Col md={9}>
                    <Select fieldDefinition={ occupation_id } value={ values.occupation_id }>
                      { _renderOccupations(occupations) }
                    </Select>
                  </Col>
                </FormGroup>
              </Col>
              <Col md={2}>
                <Button type="submit" bsSize="large" className="btn-save-profile pull-right" disabled={ invalid }>Save</Button>
              </Col>
            </Row>
          </Col>
        </Col>
      </Form>
    );
  }
}

const validate = (data) => {
  let vv = Validator.make({
    data,
    rules: {
      gender: 'required|numeric|in:1,2',
      first_name: 'first_name_min_length',
      last_name: 'last_name_min_length'
    },
    names: {
      gender: 'Gender',
      first_name: 'First Name',
      last_name: 'Last Name'
    }
  });

  if (data.last_name != undefined && data.last_name.length > 0 && data.last_name.length < 3) {
    vv.addMessage('last_name_min_length', 'The last name must be at least 3 characters');
  }
  vv.addValidate('last_name_min_length', (name, value, params) => {
    return (value.length >= 3)
  });
  if (data.first_name != undefined && data.first_name.length > 0 && data.first_name.length < 3) {
    vv.addMessage('first_name_min_length', 'The first name must be at least 3 characters');
  }
  vv.addValidate('first_name_min_length', (name, value, params) => {
    return (value.length >= 3)
  });



  let hasErrors, errors;
  if (hasErrors = vv.fails()) {
    errors = vv.firstErrors;
  }

  return hasErrors && errors;
}

export default reduxForm({
  form: 'userInformationForm',
  fields: ['username', 'phone_number', 'gender', 'occupation_id', 'area_id', 'avatar', 'first_name', 'last_name'],
  destroyOnUnmount: true,
  validate,
})(UserInformationComponent)
