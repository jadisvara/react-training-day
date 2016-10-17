import ActionTypes from '../constants/ActionTypes';

const INITIAL_STATE = {
    isConfirmDialogOpen: false,
    body: '',
    actions: [],
};

const CommonReducer = (state = INITIAL_STATE,
                      action = { type: null, payload: null }) => {
    switch (action.type) {
        case ActionTypes.SHOW_CONFIRM_DIALOG:
        console.log('CommonReducer action', action.payload);
            return {
              ...state,
              isConfirmDialogOpen: true,
              body: action.payload.body,
              actions: [...state.actions, action.payload.actions],
            };
        case ActionTypes.CLOSE_CONFIRM_DIALOG:
            return {
              ...state,
              isConfirmDialogOpen: false,
              body: '',
              actions: [],
            };
        default:
            return state;
    }
};

export default CommonReducer;
