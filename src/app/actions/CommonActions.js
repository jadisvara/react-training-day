import ActionType from '../constants/ActionTypes';

export const showConfirmDialog = (body, actions) => ({
      type: ActionType.SHOW_CONFIRM_DIALOG,
      payload: { body, actions },
  });

export const closeConfirmDialog = () => ({
      type: ActionType.CLOSE_CONFIRM_DIALOG,
});
