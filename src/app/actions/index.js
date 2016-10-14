import ActionType from '../constants/ActionTypes';
import { usersList as usersListApi } from '../resources/users';
import { tagList as tagListApi } from '../resources/tags';
import {
  questionList as questionListApi,
  saveQuestion as saveQuestionApi,
  removeQuestion as removeQuestionApi,
  updateQuestion as updateQuestionApi,
  questionById as questionByIdApi,
} from '../resources/questions';

export const increment = () => ({ type: ActionType.INCREMENT });
export const decrement = () => ({ type: ActionType.DECREMENT });

export const getUsers = () => dispatch => {
    usersListApi().then(response => {
      dispatch({
          type: ActionType.SET_USERS,
          payload: response.data,
      });
    });
};

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

export const addQuestion = (text) => dispatch => {
      dispatch({
          type: ActionType.ADD_QUESTION,
          payload: text,
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
    console.log('removeQuestion', id);
    removeQuestionApi(id).then(() => {
      dispatch({
          type: ActionType.REMOVE_QUESTION,
          payload: id,
      });
    });
};

export const searchQuestion = (text) => ({ type: ActionType.SEARCH_QUESTION, payload: text });

export const getTags = () => dispatch => {
  console.log('getTags');
    tagListApi().then(response => {
      dispatch({
          type: ActionType.SET_TAGS,
          payload: response.data,
      });
    });
};
