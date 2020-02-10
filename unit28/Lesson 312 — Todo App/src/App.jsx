import React, { Component } from 'react';
import Form from './Form';
import Todos from './Todos';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], newTodo: '' };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    this.setState((prevState) => {
      const { todos } = prevState;
      const randIndex = Math.floor(Math.random() * 1024);
      todos.push({ text: prevState.newTodo, id: randIndex });
      return { todos, newTodo: '' };
    });
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { todos, newTodo } = this.state;
    return (
      <div className="todo-app">
        <h1>Simple Todo App</h1>
        <Form
          newTodo={newTodo}
          changeHandler={this.changeHandler}
          submitHandler={this.submitHandler}
        />
        <Todos todos={todos} />
      </div>
    );
  }
}

export default App;
