import ActionTypes from '../constants/ActionTypes';

const INITIAL_STATE = {
    tags: [],
};

const TagsReducer = (state = INITIAL_STATE,
                      action = { type: null, payload: null }) => {
    switch (action.type) {
        case ActionTypes.SET_TAGS:
            return { ...state, tags: action.payload };
        default:
            return state;
    }
};

export default TagsReducer;
