import {
  /**
   * Quiz
   */
  SURVEY_QUIZ,
  SURVEY_QUIZ_SUCCESS,
  SURVEY_QUIZ_FAILURE,
  RESET_SURVEY_QUIZ,
} from '../actions/SurveyAction';


const INITIAL_STATE = {
  surveyQuiz: {
    payload: [],
    error: null,
    loading: true
  },
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    /**
     * Quiz
     */
    case SURVEY_QUIZ:
      return {...state,
        surveyQuiz: {
          loading: true,
          status: SURVEY_QUIZ
        }
      };
    case SURVEY_QUIZ_SUCCESS:
      return {...state,
        surveyQuiz: {
          payload: action.payload.data,
          loading: false,
          status: SURVEY_QUIZ_SUCCESS
        }
      };
    case SURVEY_QUIZ_FAILURE:
      error = action.payload.data || {
        message: action.payload.message
      }; //2nd one is network or server down errors
      return {...state,
        surveyQuiz: {
          error: error,
          loading: false,
          status: SURVEY_QUIZ_FAILURE
        }
      };
    case RESET_SURVEY_QUIZ:
      return {...state,
        surveyQuiz: {
          loading: false,
          status: RESET_SURVEY_QUIZ
        }
      };

      // Default
    default:
      return state;
  }
}
