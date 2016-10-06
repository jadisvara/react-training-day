import ActionType from '../constants/ActionTypes';
import { usersList as usersListApi } from '../resources/users';
import { tagList as tagListApi } from '../resources/tags';
import {
  questionList as questionListApi,
  saveQuestion as saveQuestionApi,
  removeQuestion as removeQuestionApi,
  updateQuestion as updateQuestionApi,
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

export const addQuestion = (text) => dispatch => {
      dispatch({
          type: ActionType.ADD_QUESTION,
          payload: text,
      });
};

export const saveQuestion = (data) => dispatch => {
    console.log('data', data);
    saveQuestionApi(data).then(response => {
      dispatch({
          type: ActionType.SAVE_QUESTION,
          payload: response.data,
      });
    });
};

export const updateQuestion = (data) => dispatch => {
    console.log('updateQuestion', data);
    updateQuestionApi(data).then(response => {
      dispatch({
          type: ActionType.UPDATE_QUESTION,
          payload: response.data,
      });
    });
};

export const removeQuestion = (id) => dispatch => {
    console.log('removeQuestion', id);
    removeQuestionApi(id).then(response => {
      dispatch({
          type: ActionType.REMOVE_QUESTION,
          payload: response.data,
      });
    });
};

export const getTags = () => dispatch => {
  console.log('getTags');
    tagListApi().then(response => {
      dispatch({
          type: ActionType.SET_TAGS,
          payload: response.data,
      });
    });
};
