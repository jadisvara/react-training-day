import ActionTypes from '../constants/ActionTypes';

const INITIAL_STATE = {
    questions: [],
    question: {},
    searchQuestions: [],
};

const QuestionsReducer = (state = INITIAL_STATE,
                      action = { type: null, payload: null }) => {
    switch (action.type) {
        case ActionTypes.SET_QUESTIONS:
            return { ...state, questions: action.payload };
        case ActionTypes.GET_QUESTION:
            return { ...state, question: action.payload };
        case ActionTypes.ADD_QUESTION:
            return { ...state, questions: [...state.questions, action.payload] };
        case ActionTypes.SAVE_QUESTION:
            return { ...state, questions: [...state.questions, action.payload] };
        case ActionTypes.REMOVE_QUESTION:
            return {
              ...state,
              questions: (state.questions.filter((question) => question.id !== action.payload)),
            };
        case ActionTypes.UPDATE_QUESTION:
            return { ...state, questions: [...state.questions, action.payload] };
        case ActionTypes.SEARCH_QUESTION:
        return {
          ...state,
          searchQuestions: (
            state.questions.filter((question) =>
              question.eng_text.includes(action.payload)
              || question.rus_text.includes(action.payload))
          ),
        };
        default:
            return state;
    }
};

export default QuestionsReducer;
