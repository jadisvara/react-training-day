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
    console.log('removeInterview', id);
    removeInterviewApi(id).then(() => {
      dispatch({
          type: ActionType.REMOVE_INTERVIEW,
          payload: id,
      });
    });
};
export const saveInterview = (data) => dispatch => {
    console.log('saveInterview', data);
    saveInterviewApi(data).then(response => {
      dispatch({
          type: ActionType.SAVE_INTERVIEW,
          payload: response.data,
      });
    });
};
export const updateInterview = (data) => dispatch => {
    console.log('updateInterview', data);
    updateInterviewApi(data).then(response => {
      dispatch({
          type: ActionType.UPDATE_INTERVIEW,
          payload: response.data,
      });
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
