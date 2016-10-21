import ActionType from '../constants/ActionTypes';
import {
  getInterviewQuestions as getInterviewQuestionsApi,
  saveInterviewQuestions as saveInterviewQuestionsApi,
  removeInterviewQuestion as removeInterviewQuestionApi,
  getQuestionChildren as getQuestionChildrenApi,
} from '../resources/interviewQuestions';

export const getInterviewQuestions = id => dispatch => {
    getInterviewQuestionsApi(id).then(response => {
      dispatch({
          type: ActionType.GET_INTERVIEW_QUESTIONS,
          payload: response.data,
      });
    });
};
export const saveInterviewQuestions = data => dispatch => {
    saveInterviewQuestionsApi(data).then(response => {
      dispatch({
          type: ActionType.SAVE_INTERVIEW_QUESTIONS,
          payload: response.data,
      });
    });
};
export const removeInterviewQuestion = (interviewId, questionId) => dispatch => {
    removeInterviewQuestionApi(interviewId, questionId).then(() => {
      dispatch({
          type: ActionType.REMOVE_INTERVIEW_QUESTION,
          payload: {
            interviewId,
            questionId,
          },
      });
    });
};
export const getQuestionChildren = (interviewId, questionId) => dispatch => {
    getQuestionChildrenApi(interviewId, questionId).then(response => {
      dispatch({
          type: ActionType.GET_QUESTION_CHILDREN,
          payload: {
            interviewId,
            questionId,
            children: response.data,
          },
      });
    });
};
