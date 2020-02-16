import React, { Component } from 'react';
import ky from 'ky';
import TodoWrap from './TodoWrap';
import Todo from './Todo';
import TodoForm from './TodoForm';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodoText: '',
    };
    this.getTodos = this.getTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.todoTextInput = this.todoTextInput.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  async getTodos() {
    const todos = await ky.get('api/todos', { prefixUrl: 'http://localhost:3000' }).json();
    this.setState({ todos });
  }

  async addTodo(e) {
    e.preventDefault();
    const { newTodoText: name } = this.state;
    await ky.post('api/todos', { prefixUrl: 'http://localhost:3000', json: { name } });
    this.setState({ newTodoText: '' });
    this.getTodos();
  }

  async updateTodo(id) {
    const { todos } = this.state;
    const todo = todos.find((val) => val._id === id);
    await ky.put(`api/todos/${todo._id}`, {
      prefixUrl: 'http://localhost:3000',
      json: {
        todo: {
          completed: !todo.completed,
        },
      },
    });
    this.getTodos();
  }

  async deleteTodo(id) {
    await ky.delete(`api/todos/${id}`, { prefixUrl: 'http://localhost:3000' });
    this.getTodos();
  }

  todoTextInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { newTodoText, todos } = this.state;
    return (
      <div className="todo__list">
        <TodoForm
          newTodoText={newTodoText}
          todoTextInput={this.todoTextInput}
          addTodo={this.addTodo}
        />
        <TodoWrap>
          {todos.map((todo) => {
            return (
              <Todo
                name={todo.name}
                status={todo.completed}
                key={todo._id}
                id={todo._id}
                toggleCompletion={this.updateTodo}
                deleteTodo={this.deleteTodo}
              />
            );
          })}
        </TodoWrap>
      </div>
    );
  }
}

export default TodoList;
