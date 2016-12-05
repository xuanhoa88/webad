import React from 'react';
import { Navbar, Nav, Col, Grid, Row, Button, PageHeader, Clearfix, Table, Tabs, Tab } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router';

import BaseComponent from '../BaseComponent';
import { NavItem, MenuItem } from '../ui/navigator';
import { Form, FormGroup, FormLabel, FormError, Input, Select } from '../ui/form/';
import Alert from '../ui/Alert';
import UserInformationComponent from './profile/InformationComponent';
import UserTransactionHistoryComponent from './profile/TransactionHistoryComponent';
import UserBalanceComponent from './profile/BalanceComponent';
import UserRewardHistoryComponent from './profile/RewardHistoryComponent';
import SweetAlert from 'sweetalert-react';

export default class UserProfileComponent extends BaseComponent {
  /**
   * Constructor
   */
   constructor(...args) {
     super(...args);

     // Default states
     this.state = {
       report: {
         tabIndex: 'balance',
       },
       favourite: {
         pageNumber: 1,
       },
       profile: {
         onChange: false,
       },
       showAlertFavorite: false
     };
   }

  /**
   *
   */
  componentWillMount() {
    this.props.fetchAllUserFavoutites({
      token: this.context.authentication.getToken(),
    });
  }

  componentWillReceiveProps(props) {
    // console.log('props.......', props);
  }

  /**
   * View
   */
  render() {
    let { profile } = this.props.user;
    // Loading
    if (profile.loading) {
      return (
        <Grid>
          <PageHeader>Loading...</PageHeader>
        </Grid>
      );
    }

    // Display message if error occurs
    if (profile.error || !profile.payload) {
      return (
        <Grid>
          <PageHeader>Error</PageHeader>
          <Alert status="error" isVisible={true}>{profile.message}</Alert>
        </Grid>
      )
    }

    //
    let data = Object.assign({}, profile.payload.data);

    return (
      <section id="user-profile">
        { this._personalInfo(data) }
        { this._reports() }
        { this._favourite() }
      </section>
    );
  }

  /**
   * List of report
   */
  _reports() {
    const _switchTab = (key) => {
      let report = this.state.report;

      // Set tabindex
      report.tabIndex = key;
      this.setState({
        report,
      });

      switch (key) {
        case 'balance':
          if (this._userBalanceComponent) {
            this._userBalanceComponent.switchTab('default');
          }
          break;
        case 'account':
          break;
        case 'card':
          break;
        case 'transactionHistory':
          break;
      }
    };

    return (
      <div className="report-infomation">
        <Tabs activeKey={ this.state.report.tabIndex } onSelect={ _switchTab.bind(this) } id={ "report-infomation-" + (new Date()).getTime() }>
          <Tab eventKey={ 'balance' } title="Balance">
            <UserBalanceComponent { ...this.props } ref={ c => this._userBalanceComponent = c } />
          </Tab>
          <Tab eventKey={ 'account' } title="Reward History">
            <UserRewardHistoryComponent { ...this.props } />
          </Tab>
          <Tab eventKey={ 'transactionHistory' } title="Transaction History">
            <UserTransactionHistoryComponent { ...this.props } />
          </Tab>
        </Tabs>
        <Clearfix />
      </div>
    );
  }

  /**
   * Favourite
   */
  _favourite() {
    const _loading = (favourite) => {
      if (!favourite.loading) {
        return;
      }

      return (
        <h4>Loading ...</h4>
      );
    };

    const _error = (favourite) => {
      if (!favourite.error || favourite.payload) {
        return;
      }

      return (
        <div className="error">
          <h4>Error</h4>
          <Alert status="error" isVisible={true}>{favourite.message}</Alert>
        </div>
      );
    };

    const _loadMore = (event) => {
      this.props.fetchAllUserFavoutites({
        token: this.context.authentication.getToken(),
      });
    };

    //Unfavourite
    const _unFavorite = (advertisement_id) => {
      this.props.unFavorite({
        token: this.context.authentication.getToken(),
        advertisement_id: advertisement_id,
        type: 'un_favorite'
      }).then(response => {
        // show Modal
        this.setState({ showAlertFavorite: true });
        this.props.fetchAllUserFavoutites({
            token: this.context.authentication.getToken(),
        });
      });
    }

    const _datatable = (favourite) => {
      // console.log(favourite);
      const { payload } = favourite;
      //console.log('payload............', payload);
      if (!payload.data || !Array.isArray(payload.data.data) || !payload.data.data) {
        return;
      }

      return (
        <div className="datatable-favourite">
           <h4>Favourite</h4>
           <Grid>
              <Col md={10} smOffset={1}>
              <Table responsive>
                 <tbody>
                    { payload.data.data.map(item => {
                    let featureImage;
                    if (item.images && Array.isArray(item.images)) {
                    featureImage = item.images[Math.floor(Math.random() * item.images.length)];
                    }
                    return (
                    <tr key={ item.id }>
                       <td className="col-md-1 col-xs-4 text-center">
                          <Link to={"/advertisement/" + item.id}>
                          <img className="img-responsive" src={ process.env.API + 'assets/' + featureImage } alt={ featureImage }  /></Link>
                       </td>
                       <td className="col-md-9 col-xs-6">
                          <Link to={"/advertisement/" + item.id}>
                          { item.title }</Link>
                          <p><small>{ item.advertiser.company_name }</small></p>
                       </td>
                       <td>
                          <button className="btn btn-danger pull-right btn-unfavorite" onClick={ _unFavorite.bind(this, item.id) }>Unfavourite</button>
                       </td>
                    </tr>
                    );
                    }) }
                 </tbody>
              </Table>
              <p className="text-right visible-xs-block">
                 <Button type="button" bsSize="large" className="btn-load-more-favourite" onClick={ _loadMore.bind(this) }>More Favourite</Button>
              </p>
              </Col>
              {/*
              <Col md={2} className="text-right hidden-xs">
              <Button type="button" bsSize="large" className="btn-load-more-favourite btn-position-bottom" onClick={ _loadMore.bind(this) }>More Favourite</Button>
              </Col>
              */}
           </Grid>
           <SweetAlert
              show={this.state.showAlertFavorite}
              type="success"
              title="Unfavorite successfully!"
              onConfirm={() =>
           this.setState({ showAlertFavorite: false })}/>
        </div>
      );
    };


    const { favourite } = this.props.user;

    return (
      <div className="favourite-infomation">
        { _loading(favourite) }
        { _error(favourite) }
        { _datatable(favourite) }
        <Clearfix />
      </div>
    );
  }

  /**
   * Personal info
   */
  _personalInfo(profile) {
    const _save = (formData) => {
      formData.token = this.context.authentication.getToken();
      formData.id = formData.id;
      return this.props.updateUserProfile(formData);
    };
    if(profile.occupation == null) profile.occupation = {id: ''};
    if(profile.location == undefined) profile.location = {id: ''};
    if(profile.username == null) profile.username = '';
    const initialValues = {
      name: (profile.name || '') + '',
      first_name: (profile.first_name || '') + '',
      last_name: (profile.last_name || '') + '',
      phone_number:  (profile.phone_number || '') + '',
      birthday:  (profile.birthday || '') + '',
      gender:  (profile.gender || '') + '',
      occupation_id:  (profile.occupation.id || '') + '',
      area_id:  (profile.location.id || '') + '',
      avatar:  profile.avatar ? (profile.avatar + '') : undefined,
      username: profile.username
    };

    return (
      <div className="personal-infomation">
        <h4>Personal infomation</h4>
        <UserInformationComponent {...this.props} onSave={ _save.bind(this) } initialValues={ initialValues } />
        <Clearfix />
      </div>
    );
  }
}
