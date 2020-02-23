import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { getTodos } from '../actions';

const mapDispatchToProps = { getTodos };

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;
