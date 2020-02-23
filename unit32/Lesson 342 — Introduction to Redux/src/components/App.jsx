import React, {Component} from 'react';
import Filter from './Filter';
import Form from '../containers/Form';
import VisibleTodoList from '../containers/VisibleTodoList';
import '../scss/Hero.scss'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoText: '',
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(text) {
    this.setState({ newTodoText: text});
  }

  render() {
    const {newTodoText} = this.state;
    return (
      <div className="container hero__container">
        <h1 className="hero__title">Todo List</h1>
        <Form handleInput={this.handleInput} newTodoText={newTodoText} />
        <VisibleTodoList />
        <Filter />
      </div>
    )
  }
}
