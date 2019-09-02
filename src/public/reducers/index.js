import { combineReducers } from 'redux';

import notes from './notes';
import category from './category';

const appReducer = combineReducers({
    category,notes
    
});

export default appReducer;