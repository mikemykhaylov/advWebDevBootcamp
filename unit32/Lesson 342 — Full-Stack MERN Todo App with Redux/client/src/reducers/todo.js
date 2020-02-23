import { ADD_TODO, GET_TODOS, TOGGLE_TODO, DELETE_TODO } from '../actions';

export default function todoReducer(state = [], action) {
  switch (action.type) {
    case GET_TODOS: {
      return [...action.todos];
    }

    case ADD_TODO: {
      return [...state, action.todo];
    }

    case TOGGLE_TODO: {
      const updatedTodos = state.map((todo) => {
        if (todo._id === action.todo._id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      return updatedTodos;
    }

    case DELETE_TODO: {
      return state.filter((val) => val._id !== action.todo._id);
    }
    default: {
      return state;
    }
  }
}
