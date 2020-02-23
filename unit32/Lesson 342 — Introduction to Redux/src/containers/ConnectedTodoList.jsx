import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo, deleteTodo } from '../actions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_DONE':
      return todos.filter((t) => t.done);
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.done);
    default:
      return todos;
  }
};
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos.todos, state.visibilityFilter),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
    onButtonClick: (id) => {
      dispatch(deleteTodo(id));
    },
  };
};
const ConnectedTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;
