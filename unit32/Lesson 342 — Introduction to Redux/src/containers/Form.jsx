import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo as addTodoAction } from '../actions';
import '../scss/Form.scss';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoText: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ newTodoText: e.target.value});
  }

  handleSubmit(e) {
    const { newTodoText } = this.state;
    const { addTodo } = this.props;
    e.preventDefault();
    addTodo(newTodoText);
    this.setState({newTodoText: ''})
  }
  
  render() {
    const { newTodoText } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="form__input"
          onChange={this.handleInput}
          value={newTodoText}
          placeholder="What are you going to do next?"
        />
        <button className="form__add-button" type="submit">
          Add Todo
        </button>
      </form>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (text) => text.trim() ? dispatch(addTodoAction(text)) : null,
  }
};

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Form);
