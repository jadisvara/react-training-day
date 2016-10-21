import ActionTypes from '../constants/ActionTypes';

const INITIAL_STATE = {
    interviewQuestions: [],
};
const InterviewQuestionsReducer = (state = INITIAL_STATE,
                      action = { type: null, payload: null }) => {
    switch (action.type) {
        case ActionTypes.GET_INTERVIEW_QUESTIONS:
            return {
              ...state,
              interviewQuestions: action.payload.sort((a, b) =>
              new Date(b.updated_at) - new Date(a.updated_at)),
            };
        case ActionTypes.REMOVE_INTERVIEW_QUESTION:
            return {
              ...state,
              interviewQuestions: state.interviewQuestions.filter(i =>
                i.id !== action.payload.questionId),
            };
        case ActionTypes.SAVE_INTERVIEW_QUESTIONS:
            return {
              ...state,
              interviewQuestions: [
                ...state.interviewQuestions,
                action.payload].sort((a, b) =>
                  new Date(b.updated_at) - new Date(a.updated_at)),
            };
        case ActionTypes.GET_QUESTION_CHILDREN:
            return {
              ...state,
              interviewQuestions: state.interviewQuestions.map(i => {
                if (i.id === action.payload.questionId) {
                  // Copy the object before mutating
                  return Object.assign({}, i, { children: action.payload.data });
                }
                return i;
              }),
            };
        default:
            return state;
    }
};

export default InterviewQuestionsReducer;
