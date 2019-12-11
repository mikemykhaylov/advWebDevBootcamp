import ky from 'ky';

const list = document.querySelector('.list');
const body = document.querySelector('body');
const input = document.querySelector('#todoInput');

function displayToDos(todos) {
  list.innerHTML = '';
  for (let i = 0; i < todos.length; i += 1) {
    const task = document.createElement('li');
    task.classList.add('task');
    if (todos[i].completed) {
      task.classList.add('done');
    }
    task.textContent = todos[i].name;
    const delBtn = document.createElement('span');
    delBtn.textContent = 'X';
    delBtn.addEventListener('click', () => {
      deleteToDo(todos[i]._id);
      getToDos();
    });
    task.addEventListener('click', () => {
      updateToDo(todos[i]);
      getToDos();
    });
    task.appendChild(delBtn);
    list.appendChild(task);
  }
}
async function getToDos() {
  const data = await ky.get('/api/todos').json();
  displayToDos(data);
}
async function addToDo(name) {
  await ky.post('/api/todos', { json: { name } });
}
async function updateToDo(todo) {
  await ky.put(`/api/todos/${todo._id}`, {
    json: {
      todo: {
        name: todo.name,
        completed: !todo.completed,
      },
    },
  });
}
async function deleteToDo(id) {
  await ky.delete(`/api/todos/${id}`);
}

body.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addToDo(input.value);
    getToDos();
    input.value = '';
  }
});

window.onload = getToDos();
