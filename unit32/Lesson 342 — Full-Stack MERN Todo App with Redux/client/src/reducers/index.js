import { combineReducers } from 'redux';
import todoReducer from './todo';
import setFilterReducer from './setFilter';

const rootReducer = combineReducers({
  todos: todoReducer,
  visibilityFilter: setFilterReducer,
});

export default rootReducer;
