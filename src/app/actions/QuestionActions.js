import ActionType from '../constants/ActionTypes';
import {
  questionList as questionListApi,
  saveQuestion as saveQuestionApi,
  removeQuestion as removeQuestionApi,
  updateQuestion as updateQuestionApi,
  questionById as questionByIdApi,
} from '../resources/questions';

export const getQuestions = () => dispatch => {
    questionListApi().then(response => {
      dispatch({
          type: ActionType.SET_QUESTIONS,
          payload: response.data,
      });
    });
};
export const getQuestion = (id) => dispatch => {
    questionByIdApi(id).then(response => {
      dispatch({
          type: ActionType.SET_QUESTIONS,
          payload: response.data,
      });
    });
};
export const saveQuestion = (data, callback) => dispatch => {
    saveQuestionApi(data).then(response => {
      dispatch({
          type: ActionType.SAVE_QUESTION,
          payload: response.data,
      });
      if (callback) {
        callback();
      }
    });
};
export const updateQuestion = (data, callback) => dispatch => {
    updateQuestionApi(data).then(response => {
      dispatch({
          type: ActionType.UPDATE_QUESTION,
          payload: response.data,
      });
      if (callback) {
        callback();
      }
    });
};
export const removeQuestion = (id) => dispatch => {
    removeQuestionApi(id).then(() => {
      dispatch({
          type: ActionType.REMOVE_QUESTION,
          payload: id,
      });
    });
};
