import ActionTypes from '../constants/ActionTypes';

const INITIAL_STATE = {
    questions: [],
    question: {},
    searchQuestions: [],
};

// Arguments passed to the reducer should be considered immutable.
// In other words, they shouldn't be directly changed. Instead of a direct mutation,
// we can use non-mutating methods like .concat() to essentially make a copy of the array,
// and then we'll change and return the copy
// const updateQuestions = (stateQuestions, questiontoUpdate) => {
// // Cloning the state object doesn't mean you can mutate the objects it is referring to.
//     let questions = [...stateQuestions];
//     const index = questions.findIndex((q) => q.id === questiontoUpdate.id);
//     const q = {};
//     if (~index) { // index !== -1
//       q = Object.assign(questions[index], question);
//       console.log('q', q);
//     }
//     console.log('--questions', questions);
//     return [...questions, question];
//   };

// Every single time, you must return the new state object!
const QuestionsReducer = (state = INITIAL_STATE,
                      action = { type: null, payload: null }) => {
    switch (action.type) {
        case ActionTypes.SET_QUESTIONS:
            return { ...state, questions: action.payload };
        case ActionTypes.GET_QUESTION:
            return { ...state, question: action.payload };
        case ActionTypes.ADD_QUESTION:
            return {
              ...state,
              questions: [...state.questions, action.payload],
            };
        case ActionTypes.SAVE_QUESTION:
            return { ...state, questions: [...state.questions, action.payload] };
        case ActionTypes.REMOVE_QUESTION:
            return {
              ...state,
              questions: (state.questions.filter(question => question.id !== action.payload)),
            };
        case ActionTypes.UPDATE_QUESTION:
            return {
              ...state,
              questions: state.questions.map(q => {
                if (q.id === action.payload.id) {
                  // Copy the object before mutating
                  return Object.assign({}, q, action.payload);
                }
                return q;
              }),
            };
        case ActionTypes.SEARCH_QUESTION:
        return {
          ...state,
          searchQuestions: (
            state.questions.filter(question =>
              question.eng_text.includes(action.payload)
              || question.rus_text.includes(action.payload))
          ),
        };
        default:
            return state;
    }
};

export default QuestionsReducer;
