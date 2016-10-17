import ActionType from '../constants/ActionTypes';

export function showConfirmDialog(body, actions) {
  console.log('showConfirmDialog', body, actions);
  return {
      type: ActionType.SHOW_CONFIRM_DIALOG,
      payload: { body, actions },
  };
}

export function closeConfirmDialog() {
  return {
      type: ActionType.CLOSE_CONFIRM_DIALOG,
  };
}
