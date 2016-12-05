import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, Col, Grid, Row, Button, PageHeader, Clearfix, Table, Tabs, Tab } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import Alert from '../../ui/Alert';
import BaseComponent from '../../BaseComponent';

export default class UserTransactionHistoryComponent extends BaseComponent {
  /**
   * Constructor
   */
  constructor(...args) {
    super(...args);
    let d = new Date();
    this.state = {
      filter: {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      },
      tomorrow: new Date(d.setUTCHours(0,0,0,0) + 24*60*60*1000).toISOString(),
      errorTransaction: false,
      errorMessage: '',
      transactions: []
    };
  }

  /**
   * Autoload from service
   */
   componentWillMount() {
     this.props.fetchAllUserTransactionHistory({
       token: this.context.authentication.getToken(),
     }).then(response => {
       this.setState({
         transactions: response.payload.data.data.data
       });
     });
   }

  /**
   * Start date
   */
  handleChangeStartDate(value) {
    let { filter } = this.state;
    filter.startDate = value;
    // value is an ISO String.
    this.setState({
      filter,
    });
  }

  /**
   * End date
   */
  handleChangeEndDate(value) {
    let { filter } = this.state;
    filter.endDate = value;
    // value is an ISO String.
    this.setState({
      filter,
    });
  }

  /**
  /* Render Loadmore Button
  */

  _renderLoadmore(transactionHistory){
    if(transactionHistory.payload && transactionHistory.payload.data){
      return (
        <Row hidden={ transactionHistory.payload.data.next_page_url == null }>
          <Button className="btn btn-primary btn-adv-loadmore" disabled={ transactionHistory.payload.data.next_page_url == null } onClick = { this._loadMoreRewardHistory.bind(this, transactionHistory.payload.data.current_page + 1) }>Load more</Button>
        </Row>
      );
    }
  }

  /**
   * Load more
   */
   _loadMoreRewardHistory(page) {
    this.props.fetchAllUserTransactionHistory({
      token: this.context.authentication.getToken(),
      page: page
    }).then(response => {
      this.setState({
        transactions: this.state.transactions.concat(response.payload.data.data.data)
      });
    });
  }

  /**
   * React render
   */
  render() {
    const { transactionHistory } = this.props.user;
    let transactions  = this.state.transactions;
    if (!transactionHistory.error && transactionHistory.payload.data){
      if(transactions.length == 0){
        transactions = transactionHistory.payload.data.data;
      }
    }

    const _loading = (transactionHistory) => {
      if (!transactionHistory.loading) {
        return;
      }

      return (
        <Grid>
          <h5 className="tab-header">Loading ...</h5>
        </Grid>
      );
    };

    const _error = (transactionHistory) => {
      if (!transactionHistory.error || transactionHistory.payload) {
        return;
      }

      return (
        <Grid className="error">
          <h5 className="tab-header">Error</h5>
          <Alert status="error" isVisible={true}>{transactionHistory.message}</Alert>
        </Grid>
      );
    };

    const _loadMore = (event) => {
      this.props.fetchAllUserFavoutites({
        token: this.context.authentication.getToken(),
      });
    };

    const _datatable = (transactions) => {
      const _query = (event) => {
        let start_date = this.state.filter.startDate;
        let end_date = this.state.filter.endDate;
        let tomorrow = this.state.tomorrow;
        if (start_date > end_date) {
          this.setState({
            errorTransaction: true,
            errorMessage: 'The end date must be a date after start date'
          });
          var timeout = setTimeout(() => {
            this.setState({
              errorTransaction: false
            });
          }, 10000);
        } else if (start_date >= tomorrow) {
          this.setState({
            errorTransaction: true,
            errorMessage: 'The start date must be a date before ' + tomorrow.slice(0, 10)
          });
          var timeout = setTimeout(() => {
            this.setState({
              errorTransaction: false
            });
          }, 10000);
        } else if (end_date >= tomorrow) {
          this.setState({
            errorTransaction: true,
            errorMessage: 'The end date must be a date before ' + tomorrow.slice(0, 10)
          });
          var timeout = setTimeout(() => {
            this.setState({
              errorTransaction: false
            });
          }, 10000);
        } else {
          this.props.fetchAllUserTransactionHistory({
            token: this.context.authentication.getToken(),
            start_date: this.state.filter.startDate.slice(0, 10),
            end_date: this.state.filter.endDate.slice(0, 10)
          })
        }
      };

      return (
        <div className="datatable-transaction-history">
          <Grid>
            <Col md={10} mdOffset={2} className="filtering-block">
              <Col md={4} className="query-date">
                <div className="input-group">
                  <div className="input-group-addon">Start Date</div>
                  <DatePicker value={ this.state.filter.startDate } onChange={ this.handleChangeStartDate.bind(this) } />
                </div>
              </Col>
              <Col md={4} className="query-date">
                <div className="input-group">
                  <div className="input-group-addon">End Date</div>
                  <DatePicker value={ this.state.filter.endDate } onChange={ this.handleChangeEndDate.bind(this) } />
                </div>
              </Col>
              <Col md={2}>
                <Button type="button" className="btn-primary btn-query" onClick={ _query.bind(this) }>Query</Button>
              </Col>
            </Col>
            <Col md={5} mdOffset={3}>
              <Alert status="error" isVisible={ this.state.errorTransaction }>{ this.state.errorMessage }</Alert>
            </Col>
            <Col md={12}>
              <Table striped bordered condensed hover responsive>
                <thead>
                  <tr>
                    <th className="col-md-1 col-xs-2 text-center">Date</th>
                    <th className="col-md-1 col-xs-2 text-center">Time</th>
                    <th className="col-md-3 col-xs-2 text-center">Cash Out Email</th>
                    <th className="col-md-1 col-xs-2 text-center">Status</th>
                    <th className="col-md-2 col-xs-2 text-center">Action</th>
                    <th className="col-md-2 col-xs-2 text-center">Money Involved</th>
                    <th className="col-md-2 col-xs-3 text-center">Counter Party</th>
                  </tr>
                </thead>
                <tbody>
                  { (transactions || []).map(item => {
                    let time = new Date(item.created_at);
                    let exact_time = new Date(time.getTime() - time.getTimezoneOffset() * 60000);
                    const _createdDate = moment(exact_time || new Date());
                    return (
                      <tr key={ item.id }>
                        <td className="text-center">
                          { _createdDate.format('YYYY/MM/DD') }
                        </td>
                        <td className="text-center">
                          { _createdDate.format('HH:mm:ss') }
                        </td>
                        <td className="text-center">
                          { item.cash_out_email }
                        </td>
                        <td className="text-center">
                          { item.transaction_status }
                        </td>
                        <td className="text-center">
                          { item.transaction_action }
                        </td>
                        <td className="text-center">
                          { `$ ${item.amount}` }
                        </td>
                        <td className="text-center">
                          { item.transaction_method }
                        </td>
                      </tr>
                    );
                  }) }
                </tbody>
              </Table>
            </Col>
          </Grid>
          { this._renderLoadmore(transactionHistory) }
        </div>
      );
    };

    return (
      <div className="transaction-history-tab">
        { _loading(transactionHistory) }
        { _error(transactionHistory) }
        { _datatable(transactions) }
        <Clearfix />
      </div>
    );
  }
}
