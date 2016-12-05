import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, Col, Grid, Row, ButtonGroup, Button, PageHeader, Clearfix, Table, Tabs, Tab } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import Alert from '../../ui/Alert';
import BaseComponent from '../../BaseComponent';

import UserCashOutComponent from './CashOutComponent';

export default class UserBalanceComponent extends BaseComponent {
  /**
   * Constructor
   */
  constructor(...args) {
    super(...args);

    this.state = {
      wizard: 'default',
    };
  }

  /**
   * Autoload from service
   */
  componentWillMount() {
    this.props.fetchAllUserBalance({
      token: this.context.authentication.getToken(),
    });
  }


  /**
   * React render
   */
  render() {
    const _loading = (balance) => {
      if (!balance.loading) {
        return;
      }

      return (
        <Grid>
          <h5 className="tab-header">Loading ...</h5>
        </Grid>
      );
    };

    const _error = (balance) => {
      if (!balance.error || balance.payload && balance.payload.data) {
         return;
      }

      return (
        <Grid className="error">
          <h5 className="tab-header">Error</h5>
          <Alert status="error" isVisible={true}>{balance.message}</Alert>
        </Grid>
      );
    };

    const _datatable = (balance) => {
      const { payload } = balance;

      if (!payload.data) {
        return;
      }

      return (
        <div className="datatable-balance">
          <Grid>
            { this._wizard(payload) }
          </Grid>
        </div>
      );
    };

    const { balance } = this.props.user;

    return (
      <div className="balance-tab">
        { _loading(balance) }
        { _error(balance) }
        { _datatable(balance) }
        <Clearfix />
      </div>
    );
  }

  /**
   *
   */
  _wizard(payload) {
    switch (this.state.wizard) {
      case 'cash-out':
        return this._cashOutWizard();
      case 'top-up':
        return this._topUpWizard();
      default:
        return this._defaultWizard(payload);
    }
  }

  /**
   * Switch tab
   */
  switchTab(wizard) {
    this.setState({
      wizard,
    });
  }

  /**
   * Top up view
   */
  _topUpWizard() {

  }

  /**
   * Cash out view
   */
  _cashOutWizard() {
    const { balance } = this.props.user;
    const initialValues = {
      balance: balance.payload.data.balance
    };
    return (
      <UserCashOutComponent { ...this.props } initialValues={ initialValues } switchTab={ this.switchTab.bind(this) } />
    );
  }

  /**
   * Default view
   */
  _defaultWizard(payload) {
    const _btnCashOut = (e) => {
      this.setState({
          wizard: 'cash-out',
      });
    };

    const _btnTopUp = (e) => {
      this.setState({
        wizard: 'top-up',
      });
    };

    return (
      <Col md={6} mdOffset={2}>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-md-4 text-right balance-label">Balance (SGD)</label>
            <Col md={6} className="input-group">
              <div className="input-group-addon">$</div>
              <input type="text" readOnly={true} className="form-control" value={ payload.data.balance } />
            </Col>
          </div>
          <div className="form-group">
            <Col mdOffset={6}>
              <ButtonGroup>
                <Button bsSize="lg" className="btn-balance btn-cash-out" onClick={ _btnCashOut.bind(this) }>Cash Out</Button>
              </ButtonGroup>
            </Col>
          </div>
        </div>
      </Col>
    );
  }
}
