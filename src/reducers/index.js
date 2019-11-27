/*
  root reducer with combination of all reducers.
*/
import { combineReducers } from 'redux';
import userReducer from './userreducer';
import newsReducer from './newsreducer';
import dailyreportsReducer from './dailyReportsreduce';
import contestsReducer from './contestsreduce';

const rootReducer = combineReducers({
    userReducer, 
    newsReducer,
    dailyreportsReducer,
    contestsReducer,
});
export default rootReducer;