import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, Col, Grid, Row, Button, PageHeader, Clearfix, Table, Tabs, Tab } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import Alert from '../../ui/Alert';
import BaseComponent from '../../BaseComponent';

export default class UserRewardHistoryComponent extends BaseComponent {
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
      rewards: []
    };
  }

  /**
   * Autoload from service
   */
  componentWillMount() {
    this.props.fetchAllUserRewardHistory({
      token: this.context.authentication.getToken(),
    }).then(response => {
      console.log(response);
      this.setState({
        rewards: response.payload.data.data.data
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
  /* Render Action
  */
  _renderAction(item){
    if(item.type == 'do_survey'){
      return (
        <td>
          { 'Do survey on Advertisement ' + item.advertisement.title + ' from curiocity and win S$' + item.amount + ' reward.' }
        </td>
      );
    }else{
      return (
        <td>
          { 'Share an Advertisement ' + item.advertisement.title + ' from curiocity and win S$' + item.amount + ' reward.' }
        </td>
      );
    }
  }

  /**
  /* Render Loadmore Button
  */

  _renderLoadmore(rewardHistory){
    if(rewardHistory.payload && rewardHistory.payload.data){
      return (
        <Row hidden={ rewardHistory.payload.data.next_page_url == null }>
          <Button className="btn btn-primary btn-adv-loadmore" disabled={ rewardHistory.payload.data.next_page_url == null } onClick = { this._loadMoreRewardHistory.bind(this, rewardHistory.payload.data.current_page + 1) }>Load more</Button>
        </Row>
      );
    }
  }

  /**
   * Load more
   */
   _loadMoreRewardHistory(page) {
     this.props.fetchAllUserRewardHistory({
       token: this.context.authentication.getToken(),
       page: page
     }).then(response => {
       this.setState({
         rewards: this.state.rewards.concat(response.payload.data.data.data)
       });
     });
   }

  /**
   * React render
   */
  render() {
    const { rewardHistory } = this.props.user;
    let rewards  = this.state.rewards;
    if (!rewardHistory.error && rewardHistory.payload.data){
      if(rewards.length == 0){
        rewards = rewardHistory.payload.data.data;
      }
    }

    const _loading = (rewardHistory) => {
      if (!rewardHistory.loading) {
        return;
      }

      return (
        <Grid>
          <h5 className="tab-header">Loading ...</h5>
        </Grid>
      );
    };

    const _error = (rewardHistory) => {
      if (!rewardHistory.error || rewardHistory.payload) {
        return;
      }

      return (
        <Grid className="error">
          <h5 className="tab-header">Error</h5>
          <Alert status="error" isVisible={true}>{rewardHistory.message}</Alert>
        </Grid>
      );
    };

    const _loadMore = (event) => {
      this.props.fetchAllUserRewardHistory({
        token: this.context.authentication.getToken(),
      });
    };

    const _datatable = (rewards) => {
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
          this.props.fetchAllUserRewardHistory({
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
                      <th className="col-md-5 col-xs-2 text-center">Action</th>
                      <th className="col-md-2 col-xs-2 text-center">Money Involved</th>
                    </tr>
                  </thead>
                  <tbody>
                    { (rewards || []).map(item => {
                      let time = new Date(item.updated_at);
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
                          { this._renderAction(item) }
                          <td className="text-center">
                            { `$ ${item.amount}` }
                          </td>
                        </tr>
                      );
                    }) }
                  </tbody>
                </Table>
              </Col>
            </Grid>
            { this._renderLoadmore(rewardHistory) }
          </div>
        );
      };

    return (
      <div className="transaction-history-tab">
        { _loading(rewardHistory) }
        { _error(rewardHistory) }
        { _datatable(rewards) }
        <Clearfix />
      </div>
    );
  }
}
