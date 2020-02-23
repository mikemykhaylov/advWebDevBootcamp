import { connect } from 'react-redux';
import TodoWrap from '../components/TodoWrap';
import { toggleTodo, deleteTodo } from '../actions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_DONE':
      return todos.filter((t) => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed);
    default:
      return todos;
  }
};
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};
const mapDispatchToProps = {
  toggleTodo,
  deleteTodo,
};
const ConnectedTodoWrap = connect(mapStateToProps, mapDispatchToProps)(TodoWrap);
export default ConnectedTodoWrap;
