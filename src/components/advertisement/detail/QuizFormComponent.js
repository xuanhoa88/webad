import React, { PropTypes } from 'react';
import { Grid, Well, Col, Pager } from 'react-bootstrap';
import classNames from 'classnames';

import BaseComponent from '../../BaseComponent';
import { Button } from '../../ui/button/';
import Alert from '../../ui/Alert';
import httpClient from '../../../actions/Http';
import SweetAlert from 'sweetalert-react';


const PagerItem = Pager.Item;

class AdvertisementDetailQuizFormComponent extends BaseComponent {

  /**
   * Constructor
   */
  constructor(...args) {
    super(...args);

    // Set default state
    this.state.questionSelected = undefined;
    this.state.answersSelected = new Object();
    this.state.questionIds = new Array();
    this.state.quizAnswerTrue = false;
    this.state.quizAnswerFalse = false;
    this.state.answer_message = '';
    this.state.canDoAnswer = true;
    this.state.timeRemaining = 0;
    this.state.showAlertLogin = false;
  }

  componentWillMount() {
    this.props.getCountdown({
      token: this.context.authentication.getToken(),
      advertisement_id: this.props.params.id,
    }).then(response => {
      let countdown = response.data.countdown;
      var self = this;
      this.setState({
        timeRemaining: countdown,
        canDoAnswer: false
      });
      var interval = setInterval(function() {
        if (countdown === 0) {
          clearInterval(interval);
          self.setState({
            canDoAnswer: true
          });
        } else {
          countdown--;
          self.setState({
            timeRemaining: countdown
          });
        }
      }, 1000);
    });
  }

  componentDidMount() {
    const {
      quiz
    } = this.props;
    if (Array.isArray(quiz)) {
      const questionIds = quiz.map(item => {
        return item.id;
      });
      this.setState({
        questionIds,
        questionSelected: questionIds[Math.floor(Math.random() * questionIds.length)],
      });
    }
  }

  /**
   * Handle the answer which end-user has checked
   */
  next(questionId) {
    return this.state.questionIds[(this.state.questionIds.indexOf(questionId) + 1) % this.state.questionIds.length];
  }
  nextClick(questionId) {
    const questionSelected = this.next(questionId);
    this.setState({
      questionSelected
    });
  }

  prev(questionId) {
    return this.state.questionIds[(this.state.questionIds.indexOf(questionId) - 1 + this.state.questionIds.length) % this.state.questionIds.length];
  }
  prevClick(questionId) {
    const questionSelected = this.prev(questionId);
    this.setState({
      questionSelected
    });
  }

  /**
   *  Handle submit event
   */
   _onSubmit() {
     if (this.context.authentication.getToken() == null) {
       this.setState({
         showAlertLogin: true
       })
     } else {
       let items = [];

       for (const item in this.state.answersSelected) {
         items.push({
           'question_id': item,
           'answer_id': this.state.answersSelected[item]
         });
       }
       //console.log(items);

       const answersSelected = Object.keys(this.state.answersSelected).map(key => this.state.answersSelected[key]);
       console.log(items[0].answer_id);
       console.log(items[0].question_id);
       this.props.submitAdvertisementAnswers({
         token: this.context.authentication.getToken(),
         advertisement_id: this.props.params.id,
         answer_id: items[0].answer_id,
         question_id: items[0].question_id
       }).then((response) => {
         let data = response.payload.data;
         if (data.status) {
           if (data.data.amount > 0) {
             this.setState({
               answersSelected: {},
               quizAnswerTrue: true,
               canDoAnswer: false,
               answer_message: 'Congratulation, $' + data.data.amount + ' is awarded  to you!'
             });
           } else {
             this.setState({
               answersSelected: {},
               quizAnswerTrue: true,
               canDoAnswer: false,
               answer_message: 'Thank you for your answer!'
             });
           }
         } else {
           //console.log(data.data.questions);
           //console.log(this.props.quiz);
           let quiz_titles = [];
           let quizes = [];
           for (let i = 0; i < this.props.quiz.length; i++) {
             quizes[this.props.quiz[i].id] = this.props.quiz[i].question;
           }
           for (let j = 0; j < data.data.questions.length; j++) {
             quiz_titles.push(quizes[data.data.questions[j]]);
           }

           this.setState({
             answersSelected: {},
             quizAnswerFalse: true,
             canDoAnswer: false,
             answer_message: 'Wrong answer for question ' + quiz_titles.toString()

           });
         }

         this.setState({
           answersSelected: {},
           quizSuccess: true,
           canDoAnswer: false
         });
         var timeout = setTimeout(() => {
           this.setState({
             quizAnswerTrue: false,
             quizAnswerFalse: false,
             quizAnswerError: false
           });
           clearTimeout(timeout);
         }, 5000);

         //Get countdown to submit answers
         this.props.getCountdown({
           token: this.context.authentication.getToken(),
           advertisement_id: this.props.params.id,
         }).then(response => {
           let countdown = response.data.countdown;
           var self = this;
           this.setState({
             timeRemaining: countdown
           });
           var interval = setInterval(function() {
             if (countdown === 0) {
               clearInterval(interval);
               self.setState({
                 canDoAnswer: true
               });
             } else {
               countdown--;
               self.setState({
                 timeRemaining: countdown
               });
             }
           }, 1000);
         });
       });
     }
   }

  /**
   * Handle click event
   */
   _onClick(questionId, answerId, evt) {
     //const questionSelected = this.next(questionId, answerId);
     let {
       answersSelected
     } = this.state;
     answersSelected[questionId] = answerId;
     this.setState({
       answersSelected
     });
     /*
     if(this.state.questionIds.indexOf(questionSelected) != 0){
         this.setState({
             questionSelected,
             answersSelected,
         });
     }else{
         this.setState({
             answersSelected
         });
     }
     */
   }

  /**
   * view
   */
  render() {
    let questionSelected = this.props.quiz.filter(item => {
      return (item.id === this.state.questionSelected);
    });
    const contentDefinition = questionSelected.shift();
    const timeRemaining = this.state.timeRemaining;
    if (!contentDefinition) {
      return <div />;
    }
    const hasAnswersSelected = Object.keys(this.state.answersSelected).length;
    const canDoAnswer = this.state.canDoAnswer;
    return (
    <Well key={ contentDefinition.id } className="quiz">
      <Alert isVisible={ this.state.quizAnswerTrue } status="success">{ this.state.answer_message }</Alert>
      <Alert isVisible={ this.state.quizAnswerFalse } status="error">{ this.state.answer_message + '. Please try again in the 30 seconds later!'}</Alert>
      <Grid>
        <Col md={8} className="quiz-question">
        { contentDefinition.question }
        </Col>
        <Col md={2} className="quiz-question quiz-time-remaining">
        Time Remaining: { timeRemaining }
        </Col>
        <Col md={9} className="quiz-answers text-center clearfix">
        { contentDefinition.answers.map(item => {
        return (
        <Col md={6} key={ item.id }>
        <Button className="btn btn-answer" disabled={ this.state.answersSelected[contentDefinition.id] === item.id } onClick={ this._onClick.bind(this, contentDefinition.id, item.id) }>{ item.answer }</Button>
        </Col>
        );
        }) }
        </Col>
        <Col md={9}>
        <div className="indicate-question" hidden={ this.state.questionIds.length > 0 }>
          <Pager>
            <PagerItem onClick={ this.prevClick.bind(this,contentDefinition.id) } disabled={this.state.questionIds.indexOf(contentDefinition.id) == 0}>Previous</PagerItem>
            <span>{this.state.questionIds.indexOf(contentDefinition.id) + 1}/{this.state.questionIds.length}</span>
            <PagerItem onClick={ this.nextClick.bind(this,contentDefinition.id)} disabled={this.state.questionIds.indexOf(contentDefinition.id) == (this.state.questionIds.length -1)}>Next</PagerItem>
          </Pager>
        </div>
        <Col md={1} className={ classNames("pull-right", {
        hidden: !(hasAnswersSelected == 1)
        }) }>
        <Button type="button" disabled={ !hasAnswersSelected || !canDoAnswer } className="btn-primary btn-submit" onClick={ this._onSubmit.bind(this) }>Submit</Button>
        </Col>
        </Col>
      </Grid>
      <SweetAlert
        show={this.state.showAlertLogin}
        type="error"
        title="You must login to use this function!"
        onConfirm={() =>
      this.setState({ showAlertLogin: false })}/>
    </Well>
    );
  }
}

AdvertisementDetailQuizFormComponent.propTypes = {
  quiz: PropTypes.array.isRequired,
};

AdvertisementDetailQuizFormComponent.defaultProps = {
  quiz: [],
};

export default AdvertisementDetailQuizFormComponent;
