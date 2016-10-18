import ActionType from '../constants/ActionTypes';
import {
  interviewList as interviewListApi,
  removeInterview as removeInterviewApi,
  saveInterview as saveInterviewApi,
  updateInterview as updateInterviewApi,
  interviewById as interviewByIdApi,
} from '../resources/interviews';

export const getInterviews = () => dispatch => {
  console.log('getInterviews');
    interviewListApi().then(response => {
      dispatch({
          type: ActionType.SET_INTERVIEWS,
          payload: response.data,
      });
    });
};
export const removeInterview = (id) => dispatch => {
    removeInterviewApi(id).then(() => {
      dispatch({
          type: ActionType.REMOVE_INTERVIEW,
          payload: id,
      });
    });
};
export const saveInterview = (data) => dispatch => {
    saveInterviewApi(data).then(response => {
      dispatch({
          type: ActionType.SAVE_INTERVIEW,
          payload: response.data,
      });
    });
};
export const updateInterview = (data, callback) => dispatch => {
    updateInterviewApi(data).then(response => {
      dispatch({
          type: ActionType.UPDATE_INTERVIEW,
          payload: response.data,
      });
      if (callback) {
        callback();
      }
    });
};
export const getInterview = (id) => dispatch => {
    interviewByIdApi(id).then(response => {
      dispatch({
          type: ActionType.GET_INTERVIEW,
          payload: response.data,
      });
    });
};
