import React from 'react';
import TodoList from './TodoList';
import '../scss/Hero.scss';

function App() {
  return (
    <div className="container">
      <div className="hero">
        <h1 className="hero__title">
          todo
          <span className="hero__title_bold">list</span>
        </h1>
        <h2 className="hero__subtitle">A not so simple fullstack todo app made with MERN</h2>
      </div>
      <TodoList />
    </div>
  );
}

export default App;
