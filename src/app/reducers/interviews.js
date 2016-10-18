import ActionTypes from '../constants/ActionTypes';

const INITIAL_STATE = {
    interviews: [],
};
const InterviewsReducer = (state = INITIAL_STATE,
                      action = { type: null, payload: null }) => {
    switch (action.type) {
        case ActionTypes.SET_INTERVIEWS:
            return {
              ...state,
              interviews: action.payload.sort((a, b) =>
              new Date(b.updated_at) - new Date(a.updated_at)),
            };
        case ActionTypes.REMOVE_INTERVIEW:
            return {
              ...state,
              interviews: state.interviews.filter((i) => i.id !== action.payload),
            };
        case ActionTypes.UPDATE_INTERVIEW:
            return {
              ...state,
              questions: state.interviews.map((i) => {
                if (i.id === action.payload.id) {
                  // Copy the object before mutating
                  return Object.assign({}, i, action.payload);
                }
                return i;
              }),
            };
        case ActionTypes.SAVE_INTERVIEW:
            return {
              ...state,
              interviews: [
                ...state.interviews,
                action.payload].sort((a, b) =>
                  new Date(b.updated_at) - new Date(a.updated_at)),
            };
        default:
            return state;
    }
};

export default InterviewsReducer;
