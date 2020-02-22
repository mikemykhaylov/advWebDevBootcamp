import { SET_VISIBILITY_FILTER, visibilityFilters } from '../actions';

const { SHOW_ALL } = visibilityFilters;

export default function setFilterReducer(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}
