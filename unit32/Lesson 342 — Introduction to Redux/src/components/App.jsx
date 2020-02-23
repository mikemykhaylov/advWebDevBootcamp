import React, {Component} from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

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
      <div className="container">
        <AddTodo handleInput={this.handleInput} newTodoText={newTodoText} />
        <VisibleTodoList />
        <Footer />
      </div>
    )
  }
}
