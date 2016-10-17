import ActionTypes from '../constants/ActionTypes';

const INITIAL_STATE = {
    interviews: [],
};

const getUpdatedInterviews = (interviews, interview) => {
    const index = interviews.findIndex((i) => i.id === interview.id);
    if (~index) { // eq to index !== -1
      Object.assign(interviews[index], interview);
    }
    return interviews.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
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
        // TODO: re-write as for questions
            return {
              ...state,
              interviews: getUpdatedInterviews(state.interviews, action.payload),
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
