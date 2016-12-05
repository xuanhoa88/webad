import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link, CurrentPath } from 'react-router';
import FacebookProvider from 'react-facebook';
import { Carousel, Navbar, Nav, Col, Grid, Row, PageHeader, ButtonGroup, Button, Well, Media } from 'react-bootstrap';

import BaseComponent from '../BaseComponent';
import { NavItem, MenuItem } from '../ui/navigator';
import Alert from '../ui/Alert';

import Share from '../../libraries/social/facebook/Share';
import TwitterProvider, { Tweet } from '../../libraries/social/twitter';
import GoogleMap from '../../libraries/social/google/map';
import { Form, FormGroup, FormLabel, FormError, Textarea, Input } from '../ui/form/';
import { Modal } from 'react-bootstrap';

import { LIKE_ADVERTISEMENT_SUCCESS } from '../../actions/AdvertisementAction';
import AdvertisementDetailQuizFormComponent from './detail/QuizFormComponent';
import AdvertisementDetailCommentFormComponent from './detail/CommentFormComponent';
import AdvertisementDetailCommentListomponent from './detail/CommentListComponent';
import AdvertisementDetailShareEmailFormComponent from './detail/ShareEmailFormComponent';
import SweetAlert from 'sweetalert-react';
import RichTextEditor from 'react-rte';

// Fix when built to static file
const MediaLeft = Media.Left;
const MediaBody = Media.Body;
const MediaHeading = Media.Heading;
const MediaList = Media.List;
const MediaRight = Media.Right;

const ModalHeader = Modal.Header;
const ModalTitle = Modal.Title;
const ModalBody = Modal.Body;
const ModalFooter = Modal.Footer;

const CarouselItem = Carousel.Item;
const CarouselCaption = Carousel.Caption;

class AdvertisementDetailComponent extends BaseComponent {
   constructor(...args) {
    // Invoke parent
    super(...args);

    // Initial default state
    this.state = {
      // Controlled Components
      messages: {
          likeSuccess: false
      },
      surveyAnswer: {},
      surveyQuestion: undefined,
      showAlert: false,
      showModal: false,
      showAlertFavoriteSuccess: false,
      showAlertFavoriteError: false,
      showAlertError: false,
      showAlertLikeSuccess: false,
      showAlertLikeError: false,
      showAlertUnLikeSuccess: false,
      showAlertUnLikeError: false,
      showAlertLogin: false,
      totalLike: 0,
      liked: false,
      timeRemainingShare: 0,
      canShare: true,
      showShareErrorTime: false
    };

    // Binding
    this._likeThis = this._likeThis.bind(this);
    this._shareOnFacebook = this._shareOnFacebook.bind(this);
    this._tweetOnTwitter = this._tweetOnTwitter.bind(this);
    this._showModalMail = this._showModalMail.bind(this);
    this._addToFavorite = this._addToFavorite.bind(this);
  }

  /**
   * Autoload from service
   */
  componentWillMount() {
    if(this.context.authentication.getToken()){
      this.props.fetchAdvertisementDetail({
        token: this.context.authentication.getToken(),
        id: this.props.params.id,
      });
    }else{
      this.props.fetchAdvertisementDetail({
        id: this.props.params.id,
      });
    }

    //Get countdown share
    this.props.getCountdownShare({
      token: this.context.authentication.getToken(),
      advertisement_id: this.props.params.id,
    }).then(response => {
      let countdownShare = response.data.countdown;
      var self = this;
      this.setState({
        timeRemainingShare: countdownShare,
        canShare: false
      });
      var interval = setInterval(function() {
        if (countdownShare === 0) {
          clearInterval(interval);
          self.setState({
            canShare: true
          });
        } else {
          countdownShare--;
          self.setState({
            timeRemainingShare: countdownShare
          });
        }
      }, 1000);
    });
  }

  /**
   * Share on facebook
   */
   _shareOnFacebook(_fb) {
     if (this.context.authentication.getToken() == null) {
       this._logginRequired();
     } else {
       if (this.state.timeRemainingShare == 0) {
         if (_fb === undefined) {
           this.setState({
             showAlertError: true
           });
           return;
         }

         this.props.shareOnSocialNetwok({
           token: this.context.authentication.getToken(),
           advertisement_id: this.props.params.id,
           type: 'share_social'
         }).then(response => {
           // show Alert Success
           this.setState({
             showAlert: true
           });

           //Get countdown share
           this.props.getCountdownShare({
             token: this.context.authentication.getToken(),
             advertisement_id: this.props.params.id,
           }).then(response => {
             let countdownShare = response.data.countdown;
             var self = this;
             this.setState({
               timeRemainingShare: countdownShare,
               canShare: false
             });
             var interval = setInterval(function() {
               if (countdownShare === 0) {
                 clearInterval(interval);
                 self.setState({
                   canShare: true
                 });
               } else {
                 countdownShare--;
                 self.setState({
                   timeRemainingShare: countdownShare
                 });
               }
             }, 1000);
           });
         });
       } else {
         this.setState({
           showShareErrorTime: true
         });
       }
     }
   }

  /**
   * Tweets on Twitter
   */
   _tweetOnTwitter(event, twitterData) {
     if (this.context.authentication.getToken() == null) {
       this._logginRequired();
     } else {
       if (this.state.timeRemainingShare == 0) {
         this.props.shareOnSocialNetwok({
           token: this.context.authentication.getToken(),
           advertisement_id: this.props.params.id,
           type: 'share_social'
         }).then(response => {
           console.log(response);
           // show Modal
           this.setState({
             showAlert: true
           });

           //Get countdown share
           this.props.getCountdownShare({
             token: this.context.authentication.getToken(),
             advertisement_id: this.props.params.id,
           }).then(response => {
             let countdownShare = response.data.countdown;
             var self = this;
             this.setState({
               timeRemainingShare: countdownShare,
               canShare: false
             });
             var interval = setInterval(function() {
               if (countdownShare === 0) {
                 clearInterval(interval);
                 self.setState({
                   canShare: true
                 });
               } else {
                 countdownShare--;
                 self.setState({
                   timeRemainingShare: countdownShare
                 });
               }
             }, 1000);
           });
         });
       } else {
         this.setState({
           showShareErrorTime: true
         });
       }
     }
   }

  //Show modal email
  _showModalMail() {
    if (this.context.authentication.getToken() == null) {
      this._logginRequired();
    } else if (this.state.timeRemainingShare > 0) {
      this.setState({
        showShareErrorTime: true
      });
    } else {
      this.setState({
        showModal: true
      });
    }
  }

  //Add to favourite
  _addToFavorite() {
    if (this.context.authentication.getToken() == null) {
      this._logginRequired();
    } else {
      this.props.addToFavorite({
        token: this.context.authentication.getToken(),
        advertisement_id: this.props.params.id,
        type: 'favorite'
      }).then(response => {
        // show Modal
        if (response.payload.data.status) {
          this.setState({
            showAlertFavoriteSuccess: true
          });
        } else {
          this.setState({
            showAlertFavoriteError: true
          });
        }
      });
    }
  }

  /**
  /*Like advertisement
  **/
  _likeAdvertisement() {
    this.props.likeAdvertisement({
      token: this.context.authentication.getToken(),
      advertisement_id: this.props.params.id,
      type: 'like'
    }).then(response => {
      // show Modal
      if (response.payload.data.status) {
        let totalLike = this.state.totalLike;
        this.setState({
          totalLike: totalLike + 1,
          liked: true
        });
      } else {
        this.setState({
          showAlertLikeError: true
        });
      }
    });
  }

  /**
  /*UnLike advertisement
  **/
  _unlikeAdvertisement() {
    this.props.unlikeAdvertisement({
      token: this.context.authentication.getToken(),
      advertisement_id: this.props.params.id,
      type: 'un_like'
    }).then(response => {
      // show Modal
      if (response.payload.data.status) {
        let totalLike = this.state.totalLike;
        this.setState({
          totalLike: totalLike - 1,
          liked: false
        });
      } else {
        this.setState({
          showAlertUnLikeError: true
        });
      }
    });
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
   * View slides
   */
  _renderSlides(images) {
    if (images.length === 0) {
      return;
    }
    return (
      <Grid className="carousel-block">
        <Carousel interval={ 3000 }>
          { images.map(item => {
            return (
              <CarouselItem key={ Math.random() }>
                <img alt="1920x768" src={ process.env.API + 'assets/' + item } />
              </CarouselItem>
            );
          }) }
        </Carousel>
      </Grid>
    );
  }

  /**
   * Like block
   */
   _renderLike(data){
     if (data.activities != undefined) {
       if(!this.state.liked){
         return (
           <span className="adv-unlike" onClick={ this._likeAdvertisement.bind(this) }><a href="javascript:void(0)"><i className="fa fa-thumbs-o-up unlike" aria-hidden="true"></i></a> { this.state.totalLike }</span>
         )
       }else{
         return (
           <span className="adv-like" onClick={ this._unlikeAdvertisement.bind(this) }><a href="javascript:void(0)"><i className="fa fa-thumbs-o-up like" aria-hidden="true"></i></a> { this.state.totalLike }</span>
         )
       }
     }else{
       return(
         <span className="adv-like" onClick={ this._logginRequired.bind(this) }><a href="javascript:void(0)"><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a> { data.total_like }</span>
       )
     }
   }

   /**
   * Facebook share
   */
   _renderFacebook(data){
     if(this.context.authentication.getToken() == null){
       return(
         <span onClick={ this._checkLogin.bind(this) }><i className="fa fa-facebook fa-stack-1x"></i></span>
       )
     }else if(this.state.timeRemainingShare > 0){
       return(
         <span onClick={ this._showErrorShare.bind(this) }><i className="fa fa-facebook fa-stack-1x"></i></span>
       )
     }else{
       return(
         <FacebookProvider appID={process.env.FACEBOOK.APP_ID}>
           <Share name={data.title} description={data.description} href={ location.toString() } picture = {process.env.API + 'assets/' + data.images[0]}onSubmit={ this._shareOnFacebook }>
             <i className="fa fa-facebook fa-stack-1x"></i>
           </Share>
         </FacebookProvider>
       )
     }
   }

   /**
   * Twitter share
   */
   _renderTwitter(data){
     if(this.context.authentication.getToken() == null){
       return(
         <span onClick={ this._checkLogin.bind(this) }><i className="fa fa-twitter fa-stack-1x"></i></span>
       )
     }else if(this.state.timeRemainingShare > 0){
       return(
         <span onClick={ this._showErrorShare.bind(this) }><i className="fa fa-twitter fa-stack-1x"></i></span>
       )
     }else{
       return(
         <TwitterProvider env={process.env.TWITTER}>
           <Tweet href={ location.toString() } text={data.title} id={"advertise-" + data.id} onClick={ this._tweetOnTwitter }>
             <i className="fa fa-twitter fa-stack-1x"></i>
           </Tweet>
         </TwitterProvider>
       )
     }
   }

   closeModal() {
    this.setState({ showModal: false})
   }

   onSave(formData) {
    this.props.shareOnSocialNetwok({
      advertisement_id: this.props.params.id,
      token: this.context.authentication.getToken(),
      type: 'share_email',
      name: formData.name,
      email: formData.email,
      url: process.env.URL.web_url + "advertisement/" + this.props.params.id
    }).then(response => {
      this.closeModal();
      this.setState({
        showAlert: true,
      });

      //Get countdown share
      this.props.getCountdownShare({
        token: this.context.authentication.getToken(),
        advertisement_id: this.props.params.id,
      }).then(response => {
        let countdownShare = response.data.countdown;
        var self = this;
        this.setState({
          timeRemainingShare: countdownShare,
          canShare: false
        });
        var interval = setInterval(function() {
          if (countdownShare === 0) {
            clearInterval(interval);
            self.setState({
              canShare: true
            });
          } else {
            countdownShare--;
            self.setState({
              timeRemainingShare: countdownShare
            });
          }
        }, 1000);
      });
    });
  };

   _showErrorShare(){
     this.setState({
       showShareErrorTime: true,
    });
   }

  /**
   * View detail
   */
  _renderDetail(payload) {
    payload = Object.assign({}, payload);

    if (!payload.data) {
      return (
        <Col className="detail-block">
          <PageHeader>Error</PageHeader>
          <Alert isVisible={true} status="error">{ payload.message }</Alert>
        </Col>
      );
    }

    const { data } = payload;

    let quiz = [];
    if (Array.isArray(data.surveys)) {
      quiz = data.surveys;
    }

    let images = [];
    let address;
    if (Array.isArray(data.images)) {
      images = data.images;
    }

    let adv_id = data.id;
    if(this.state.totalLike == 0){
      this.state.totalLike = data.total_like;
    }
    if(this.state.liked == false && data.activities != undefined){
      this.state.liked = data.activities.like;
    }
    if(data.advertiser.company_address != undefined){
      address = data.advertiser.company_address;
    }else{
      address = data.advertiser.individual_address;
    }

    let width = window.innerWidth;
    return (
      <Col>
        { this._renderSlides(images) }

        <Col className="detail-block">
          <Col md={9}>
            <h1>{ data.title }</h1>
            {this._renderLike(data)}
            <div className="short-description">{ data.sub_title }</div>
            <div className="map-marker">
              <i className="fa fa-map-marker"></i> { data.advertiser.company_address != undefined ? data.advertiser.company_address:  data.advertiser.individual_address }
            </div>
            <div className="long-description" dangerouslySetInnerHTML={{__html: data.description}}></div>
            <AdvertisementDetailQuizFormComponent { ...this.props } quiz={ quiz }/>
            <Row hidden={ width <= 992 } className="row-comment">
              <AdvertisementDetailCommentListomponent { ...this.props }/>
              <AdvertisementDetailCommentFormComponent {...this.props} id="comment-box" hidden={ false } rows={5}/>
            </Row>
          </Col>
          <Col md={3}>
            <Well className="text-center share-it-now">
              <Button className="text-share-it-now btn-block btn-lg" onClick={ this._addToFavorite }>Add to favourite</Button>
              <br />
              <ButtonGroup justified>
                <span className="fa-stack fa-lg">
                  <i className="fa fa-circle-thin fa-stack-2x"></i>
                  { this._renderFacebook(data) }
                </span>
                <span className="fa-stack fa-lg" onClick={ this._checkLogin.bind(this) }>
                  <i className="fa fa-circle-thin fa-stack-2x"></i>
                  { this._renderTwitter(data) }
                </span>
                <span className="fa-stack fa-lg" onClick={ this._showModalMail }>
                  <i className="fa fa-circle-thin fa-stack-2x"></i>
                  <i className="fa fa-envelope fa-stack-1x"></i>
                </span>
                <span className="fa-stack fa-lg pull-right">
                  <i className="fa fa-circle-thin fa-stack-2x"></i>
                  <i className="fa fa-stack-1x">{ this.state.timeRemainingShare }</i>
                </span>
              </ButtonGroup>
            </Well>

            {/*  Modal share email */}
            <Modal show={this.state.showModal} onHide={ this.closeModal.bind(this) }>
              <ModalHeader closeButton>
                <ModalTitle>Share Email</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <AdvertisementDetailShareEmailFormComponent formKey={ data.id } onSave={ this.onSave.bind(this) } showAlert={ this.state.showAlert } />
              </ModalBody>
            </Modal>

            <Well className="highlights">
              <h3>Highlights</h3>
              <Nav>
                <NavItem>
                  <i className="fa fa-home"></i> { data.advertiser.company_address != undefined ? data.advertiser.company_address:  data.advertiser.individual_address }
                </NavItem>
                <NavItem>
                  <i className="fa fa-phone"></i> { data.advertiser.company_tel != undefined ? data.advertiser.company_tel:  data.advertiser.individual_tel }
                </NavItem>
                <NavItem>
                  <i className="fa fa-envelope"></i> { data.advertiser.email }
                </NavItem>
              </Nav>
            </Well>

            { data.url && <Well className="link">Please visit the website for more details: <a href={ data.url } target="_blank">{ data.url }</a></Well> }

            <Well className="map">
              <GoogleMap
                  latitude={21.0277644}
                  longitude={105.8341598}
                  zoom={15}
                  width={"auto"}
                  height={250}
                  apiKey={ process.env.GOOGLE.MAP_API_KEY }
                  points={[{latitude: 21.0277644, longitude: 105.8341598, title: "Ha Noi"}]}
                  address={address}
                  />
            </Well>
          </Col>
          <Col md={9} className="block-comment" hidden={ width > 992 }>
            <AdvertisementDetailCommentListomponent { ...this.props } />
            <AdvertisementDetailCommentFormComponent {...this.props} id="comment-box" hidden={ false } rows={5} />
          </Col>
        </Col>
        <SweetAlert
            show={this.state.showAlert}
            type="success"
            title="Share successfully!"
            onConfirm={() => this.setState({ showAlert: false })}/>
        <SweetAlert
            show={this.state.showAlertFavoriteSuccess}
            type="success"
            title="Add to favorite successfully!"
            onConfirm={() => this.setState({ showAlertFavoriteSuccess: false })}/>
        <SweetAlert
            show={this.state.showAlertFavoriteError}
            type="error"
            title="You already favorite this ads!"
            onConfirm={() => this.setState({ showAlertFavoriteError: false })}/>
        <SweetAlert
            show={this.state.showAlertError}
            type="error"
            title="You have not shared!"
            onConfirm={() => this.setState({ showAlertError: false })}/>
        <SweetAlert
            show={this.state.showAlertLogin}
            type="error"
            title="You must login to use this function!"
            onConfirm={() => this.setState({ showAlertLogin: false })}/>
        <SweetAlert
            show={this.state.showShareErrorTime}
            type="error"
            title="You cannot share now!"
            onConfirm={() => this.setState({ showShareErrorTime: false })}/>
      </Col>
    );
  }

  /**
   * Like
   */
  _likeThis() {
    this.props.likeAdvertisement({
      advertise_id: this.props.params.id,
      token: this.state.APIToken
    }, (status) => {
      if (status.type === LIKE_ADVERTISEMENT_SUCCESS) {
        this.state.messages.likeSuccess = true;
      }
    });
  }

  /**
   * React render
   */
  render() {
    const { advertisementDetail }  = this.props;
    if (advertisementDetail.loading) {
      return (
        <Grid>
          <PageHeader>Loading...</PageHeader>
        </Grid>
      );
    }

    if (advertisementDetail.error) {
      return (
        <Grid>
          <PageHeader>Error</PageHeader>
          <Alert status="error" isVisible={true}>{advertisementDetail.message}</Alert>
        </Grid>
      );
    }

    let image = advertisementDetail.payload.data.images[0];
    var meta = document.createElement('meta');
    meta.setAttribute('property', 'og:image');
    meta.setAttribute('content', 'http://webad.savvycom.vn/' + image);
    document.getElementsByTagName('head')[0].appendChild(meta);
    return (
      <section id="advertisement-detail">
        { this._renderDetail(advertisementDetail.payload) }
      </section>
    );
  }
}

export default AdvertisementDetailComponent;
