import ky from 'ky';

export const ADD_TODO = 'ADD_TODO';
export const GET_TODOS = 'GET_TODOS';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const visibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_DONE: 'SHOW_DONE',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

function handleAddTodo(todo) {
  return { type: ADD_TODO, todo };
}

function handleGetTodos(todos) {
  return { type: GET_TODOS, todos };
}

function handleToggleTodo(todo) {
  return { type: TOGGLE_TODO, todo };
}

function handleDeleteTodo(todo) {
  return { type: DELETE_TODO, todo };
}

export const setVisibilityFilter = (filter) => {
  return { type: SET_VISIBILITY_FILTER, filter };
};

export const addTodo = (name) => {
  return async (dispatch) => {
    const createdTodo = await ky
      .post('api/todos', { prefixUrl: 'http://localhost:3000', json: { name } })
      .json();
    dispatch(handleAddTodo(createdTodo));
  };
};

export const getTodos = () => {
  return async (dispatch) => {
    const recievedTodos = await ky.get('api/todos', { prefixUrl: 'http://localhost:3000' }).json();
    dispatch(handleGetTodos(recievedTodos));
  };
};

export const toggleTodo = (id, completed) => {
  return async (dispatch) => {
    const updatedTodo = await ky
      .put(`api/todos/${id}`, {
        prefixUrl: 'http://localhost:3000',
        json: {
          todo: {
            completed: !completed,
          },
        },
      })
      .json();
    dispatch(handleToggleTodo(updatedTodo));
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    const deletedTodo = await ky
      .delete(`api/todos/${id}`, { prefixUrl: 'http://localhost:3000' })
      .json();
    dispatch(handleDeleteTodo(deletedTodo));
  };
};
