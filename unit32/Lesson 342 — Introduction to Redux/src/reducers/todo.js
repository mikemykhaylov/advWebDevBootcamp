import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../actions';

const initialState = {
  todos: [],
  nextTodoIndex: 0,
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.text,
            done: false,
            id: state.nextTodoIndex,
          },
        ],
        nextTodoIndex: state.nextTodoIndex + 1,
      };
    }

    case TOGGLE_TODO: {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((val) => val.id !== action.id)
      }
    }
    default: {
      return state;
    }
  }
}
