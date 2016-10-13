import { combineReducers } from 'redux';

import routing from './routeReducer';
import counter from './counter';
import users from './users';
import questions from './questions';
import tags from './tags';
import interviewState from './interviews';

const rootReducer = combineReducers({
    routing,
    counter,
    users,
    questions,
    tags,
    interviewState,
    // add here other reducers
});

export default rootReducer;
