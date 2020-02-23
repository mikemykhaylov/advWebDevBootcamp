import React from 'react';
import FilterLink from '../containers/FilterLink';
import { visibilityFilters } from '../actions';
import '../scss/Filter.scss'

const Filter = () => (
  <div className="filter">
    Show: 
    <FilterLink filter={visibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={visibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={visibilityFilters.SHOW_DONE}>Completed</FilterLink>
  </div>
);
export default Filter;
