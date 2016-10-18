import ActionType from '../constants/ActionTypes';
import {
  tagList as tagListApi,
  saveTag as saveTagApi,
} from '../resources/tags';

export const getTags = () => dispatch => {
    tagListApi().then(response => {
      dispatch({
          type: ActionType.SET_TAGS,
          payload: response.data,
      });
    });
};
export const saveTag = (tag, callback) => dispatch => {
    saveTagApi(tag).then(response => {
      dispatch({
          type: ActionType.SAVE_TAG,
          payload: response.data,
      });
      if (callback) {
        callback();
      }
    });
};
