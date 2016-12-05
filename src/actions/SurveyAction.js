import httpClient from './Http';

//Advertisement Quiz
export const ADVERTISEMENT_QUIZ = 'ADVERTISEMENT_QUIZ';
export const ADVERTISEMENT_QUIZ_SUCCESS = 'ADVERTISEMENT_QUIZ_SUCCESS';
export const ADVERTISEMENT_QUIZ_FAILURE = 'ADVERTISEMENT_QUIZ_FAILURE';

// Quiz
export const SURVEY_QUIZ = 'SURVEY_QUIZ';
export const SURVEY_QUIZ_SUCCESS = 'SURVEY_QUIZ_SUCCESS';
export const SURVEY_QUIZ_FAILURE = 'SURVEY_QUIZ_FAILURE';
export const RESET_SURVEY_QUIZ = 'RESET_SURVEY_QUIZ';

//Get countdown quiz
export const GET_COUNTDOWN = 'GET_COUNTDOWN';
export const GET_COUNTDOWN_SUCCESS = 'GET_COUNTDOWN_SUCCESS';
export const GET_COUNTDOWN_FAILURE = 'GET_COUNTDOWN_FAILURE';

export function submitSurveyAnswers(props) {
  return {
    type: SURVEY_QUIZ,
    payload: httpClient.post('/api/member/adv/' + props.advertisement_id + '/do_survey?token=' + props.token, props)
  };
}

export function submitAdvertisementAnswers(props) {
  return {
    type: ADVERTISEMENT_QUIZ,
    payload: httpClient.post('/api/member/adv/' + props.advertisement_id + '/do_answer?token=' + props.token, props)
  };
}

export function getCountdown(params) {
  return {
    type: GET_COUNTDOWN,
    payload: httpClient.get('/api/member/adv/' + params.advertisement_id + '/countdown', {
      params
    })
  };
}
