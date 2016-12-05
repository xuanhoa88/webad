import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Navbar, Nav, Col, Grid, Row, NavDropdown, PageHeader, Button} from 'react-bootstrap';
import classNames from 'classnames';

import BaseComponent from '../BaseComponent';
import { NavItem, MenuItem } from '../ui/navigator';
import Alert from '../ui/Alert';
import SweetAlert from 'sweetalert-react';

// Fix when built to static file
const NavbarHeader = Navbar.Header;
const NavbarBrand = Navbar.Brand;
const NavbarCollapse = Navbar.Collapse;
const NavbarToggle = Navbar.Toggle;

class AdvertisementListComponent extends BaseComponent {

  /**
  * Constructor
  */
  constructor(...args) {
    // Invoke parent
    super(...args);

    // Binding
    this._renderCategories = this._renderCategories.bind(this);
    this.state.advertises = [];
    this.state.showAlertLogin = false;
  }

  /**
   * Autoload from service
   */
   componentWillMount() {
     this.props.fetchAllAdvertisements({
       token: this.context.authentication.getToken(),
     }).then(response => {
       this.setState({
         advertises: response.data.data
       });
     });
     this.props.fetchAllCategories();
   }

  /**
   * Render list of category
   */
  _renderCategories() {
    const { categories } = this.props;
    if (categories.payload && Array.isArray(categories.payload.data)) {
      return categories.payload.data.map(obj => {
        return (
          <MenuItem key={ obj.id } className={ classNames({"active": this.props.params.id === obj.id}) }>
            <Link to={ "/advertisement/category/" + obj.id }>{ obj.name }</Link>
          </MenuItem>
        );
      });
    }
  }

  /**
   * Load more
   */
   _loadMoreAdvertisement(page) {
      if(this.props.params.id == undefined){
        this.props.fetchAllAdvertisements({
          token: this.context.authentication.getToken(),
          page: page
        }).then(response => {
          this.setState({
            advertises: this.state.advertises.concat(response.data.data)
          });
        });
      }else{
        this.props.fetchAllAdvertisementsByCategory({
          category_id: this.props.params.id,
          token: this.context.authentication.getToken(),
          page: page
        }).then(response => {
          this.setState({
            advertises: this.state.advertises.concat(response.data.data)
          });
        });
      }
    }

   //Add to favourite
   _addToFavorite(item, key) {
    if (this.context.authentication.getToken() == null) {
      this._logginRequired();
    } else {
      if (item.activities.favorite) {
        this.props.unFavorite({
          token: this.context.authentication.getToken(),
          advertisement_id: item.id,
          type: 'un_favorite'
        }).then(response => {
          this.state.advertises[key].activities.favorite = false;
          this.setState({
            advertises: this.state.advertises
          });
        });
      } else {
        this.props.addToFavorite({
          token: this.context.authentication.getToken(),
          advertisement_id: item.id,
          type: 'favorite'
        }).then(response => {
          this.state.advertises[key].activities.favorite = true;
          this.setState({
            advertises: this.state.advertises
          });
        });
      }
    }
  }

   /**
   /*Like advertisement
   **/
   _likeAdvertisement(item, key) {
    if (this.context.authentication.getToken() == null) {
      this._logginRequired();
    } else {
      if (item.activities.like) {
        this.props.unlikeAdvertisement({
          token: this.context.authentication.getToken(),
          advertisement_id: item.id,
          type: 'un_like'
        }).then(response => {
          // show Modal
          if (response.payload.data.status) {
            this.state.advertises[key].activities.like = false;
            this.state.advertises[key].total_like = this.state.advertises[key].total_like - 1;
            this.setState({
              advertises: this.state.advertises
            });
          }
        });
      } else {
        this.props.likeAdvertisement({
          token: this.context.authentication.getToken(),
          advertisement_id: item.id,
          type: 'like'
        }).then(response => {
          // show Modal
          if (response.payload.data.status) {
            this.state.advertises[key].activities.like = true;
            this.state.advertises[key].total_like = this.state.advertises[key].total_like + 1;
            this.setState({
              advertises: this.state.advertises
            });
          }
        });
      }
    }
  }

  /**
  * Require login
  **/
  _logginRequired() {
   this.setState({
     showAlertLogin: true
   });
  }

 _checkLogin(){
   if(this.context.authentication.getToken() == null){
     this._logginRequired();
   }
 }

/**
 * React render
 */
render() {
  const { advertisements } = this.props;
  let advertises  = this.state.advertises;

  if (!advertisements.error && advertisements.payload.data){
    //console.log(advertisements.payload.data.next_page_url);
    if(advertises.length == 0){
      advertises = advertisements.payload.data.data;
    }
  }
  //console.log(this.state.advertises);
  // Loading
  if (advertisements.loading) {
    return (
      <Grid>
        <PageHeader>Loading...</PageHeader>
      </Grid>
    );
  }

  // Display message if error occurs
  if (advertisements.error || !advertisements.payload) {
    return (
      <Grid>
        <PageHeader>Error</PageHeader>
        <Alert status="error" isVisible={true}>{advertisements.message}</Alert>
      </Grid>
    )
  }

    // Render
    return (
      <section id="advertisement-list">
        <header>
          <div className="brand"></div>
        </header>

        <Navbar>
          <NavbarHeader>
            <NavbarToggle />
          </NavbarHeader>
          <NavbarCollapse>
            <Nav>
              <NavDropdown title="Categories" id="advertisement-categories">
                  <MenuItem className={ classNames({"active": !this.props.params.id}) }><Link to="/advertisement/list">All</Link></MenuItem>
                  { this._renderCategories() }
              </NavDropdown>
              <NavItem><Link to="/about-us">About Us</Link></NavItem>
              <NavItem><Link to="/how-it-works">How It Works</Link></NavItem>
              <NavItem><Link to="/user/contact-us">Contact Us</Link></NavItem>
              <NavItem><Link to="/faq">F.A.Q</Link></NavItem>
            </Nav>
          </NavbarCollapse>
        </Navbar>

        <Grid className="list-all">
          { (advertises || []).map((item, key) => {
            let images = item.images;
            if (!Array.isArray(images)) {
              images = [];
            }
            let featureImage;
            let type;
            if (images.length) {
              featureImage = images[0];
            }

            if(item.type == '1'){
              type = 'advertise';
            }else{
              type = 'survey'
            }
            let time = new Date(item.created_at);
            var exact_time = new Date(time.getTime() - time.getTimezoneOffset() * 60000);

            const routeLinkOnclick = (e) => {
              e.preventDefault();
              window.open(e.currentTarget.href);
            };

            return (
              <Col md={6} key={ item.id } className="adv-list-fix-height">
                <div className="thumbnail advertisement-item">
                  {/*
                  <div className="top-thumbnail">
                    <span className="balance">S${ item.balance }/{ item.spend_money }</span>
                    <div className="pull-right like-block">
                      <span className={ item.activities && item.activities.favorite ? 'favorited' : 'favorite' } onClick={ this._addToFavorite.bind(this, item, key ) }><i className="fa fa-heart"></i></span>
                      <span className={ item.activities && item.activities.like ? 'liked' : 'like' } onClick={ this._likeAdvertisement.bind(this, item, key ) }><i className="fa fa-thumbs-up"></i>{ item.total_like }</span>
                    </div>
                  </div>
                  */}
                  { featureImage && <Link to={"/advertisement/" + item.id} onClick={ routeLinkOnclick.bind(this) }><img className="img-responsive img-full" data-src-retina={ process.env.API + 'assets/v1/' + featureImage } data-src={ process.env.API + 'assets/v1/' + featureImage } src={ process.env.API + 'assets/v1/' + featureImage } alt={ featureImage } /></Link> }

                  <Col md={12} className="caption">
                    <Col md={2} className={ "advertisement-type " + type }><span>{ item.reward_value_fixed > 0 ? "$ " + item.reward_value_fixed: "$ " + item.reward_value_min + '-' + item.reward_value_max }</span></Col>
                    <Col md={10} className="advertisement-desc">
                      <h4>
                        <Row>
                          <span className="advertisement-title" title={ item.title }><Link to={"/advertisement/" + item.id} onClick={ routeLinkOnclick.bind(this) }>{ item.title }</Link></span>
                          <span className="advertisement-timeago"><div className="pull-right">{moment(exact_time).fromNow()}</div></span>
                        </Row>
                      </h4>
                      <p className="quote sub-title" title={ item.sub_title }>{ item.sub_title }</p>
                      <p className="quote" title={ item.advertiser.company_address != undefined ? item.advertiser.company_address : item.advertiser.individual_address }><i className="fa fa-map-marker"></i> { item.advertiser.company_address != undefined ? item.advertiser.company_address : item.advertiser.individual_address }</p>
                    </Col>
                  </Col>
                </div>
              </Col>
            );
          }) }
        </Grid>
        <Row hidden={ advertisements.payload.data.next_page_url == null }>
          <Button className="btn btn-primary btn-adv-loadmore" disabled={ advertisements.payload.data.next_page_url == null} onClick = { this._loadMoreAdvertisement.bind(this, advertisements.payload.data.current_page + 1) }>Load more</Button>
        </Row>
        <SweetAlert
            show={this.state.showAlertLogin}
            type="error"
            title="You must login to use this function!"
            onConfirm={() => this.setState({ showAlertLogin: false })}/>
      </section>
    );
  }
}

export default AdvertisementListComponent;
