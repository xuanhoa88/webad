import React from 'react';
import { Media } from 'react-bootstrap';
import moment from 'moment';

import AdvertisementDetailCommentFormComponent from './CommentFormComponent';
import BaseComponent from '../../BaseComponent';

import userAvatar from '../../../styles/assets/user_avatar.png';

// Fix when built to static file
const MediaLeft = Media.Left;
const MediaBody = Media.Body;
const MediaHeading = Media.Heading;
const MediaList = Media.List;
const MediaRight = Media.Right;

export default class AdvertisementDetailCommentListomponent extends BaseComponent {
  constructor(...args) {
    super(...args);
    this.state.commentFormHidden = undefined;
  }

  /**
   * Autoload from service
   */
   componentWillMount() {
     this.props.fetchCommentAdvertisement({
       advertise_id: this.props.params.id,
       token: this.context.authentication.getToken(),
     });
   }

  _formLooping(data, showForm) {
    if (!Array.isArray(data)) {
      return <div />;
    }
    const showCommentForm = (commentId, event) => {
      if(this.state.commentFormHidden == undefined || this.state.commentFormHidden != commentId){
        this.setState({
          commentFormHidden: commentId,
        });
      }else{
        this.setState({
          commentFormHidden: undefined,
        });
      }
    };

    const _renderAvatar = (avatar) => {
      if (avatar != null) {
        return (
          <img width={64} height={64} src={ (process.env.API + 'assets/' + avatar) } alt="Image"/>
        );
      }else{
        return(
          <img width={64} height={64} src={ userAvatar } alt="Image"/>
        );
      }
    };

    return (
      <MediaList className="comments">
        {
          data.map(item => {
            let time = new Date(item.created_at);
            var exact_time = new Date(time.getTime() - time.getTimezoneOffset() * 60000);
            return (
              <Media key={ item.id }>
                <MediaLeft align="top">
                  { _renderAvatar(item.user.avatar) }
                  {/*
                      <img width={64} height={64} src={ (process.env.API + 'assets/' + item.user.avatar) || userAvatar } alt="Image"/>
                  */}
                </MediaLeft>
                <MediaBody>
                  <MediaHeading>
                    <span className="user">{ item.user.email }</span>
                    <div className="pull-right">
                        <a href={ "#comment-box-" + item.id } onClick={ showCommentForm.bind(this, item.id) } hidden={item.parent_id != null}>Reply</a>
                    </div>
                  </MediaHeading>
                    { item.comment }
                    <div className="time-ago">{moment(exact_time).fromNow()}</div>

                    { this._formLooping(item.comments, false) }
                    <AdvertisementDetailCommentFormComponent formKey={item.id} {...this.props} id={ item.id } hidden={ !(this.state.commentFormHidden === item.id) || !showForm } pId={ item.id } />
                </MediaBody>
              </Media>
            );
          })
        }
      </MediaList>
    );
  }

  /**
   * Comment list
   */
  render() {
    const { fetchComment } = this.props;

    if (fetchComment.loading || fetchComment.error || !fetchComment.payload) {
      return <div />;
    }

    // with reponse empty data
    if (!Array.isArray(fetchComment.payload.data.data) || !fetchComment.payload.data.data) {
      return <div />;
    }

    return this._formLooping(fetchComment.payload.data.data, true);
  }
}
