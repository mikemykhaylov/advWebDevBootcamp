import React from 'react';
import Filter from './Filter';
import Form from '../containers/Form';
import ConnectedTodoList from '../containers/ConnectedTodoList';
import '../scss/Hero.scss';

export default function App() {
  return (
    <div className="container hero__container">
      <h1 className="hero__title">Todo List</h1>
      <Form />
      <ConnectedTodoList />
      <Filter />
    </div>
  );
}
