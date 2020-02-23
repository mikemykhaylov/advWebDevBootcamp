import React from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Filter from './Filter';
import Form from '../containers/Form';
import ConnectedTodoList from '../containers/ConnectedTodoList';
import '../scss/Hero.scss';

export default function App() {
  return (
    <div className="container hero__container">
      <h1 className="hero__title">Todo List</h1>
      <nav className="hero__nav">
        <NavLink exact className="hero__link" activeClassName="hero__link_active" to="/todos">
          View todos
        </NavLink>
        <NavLink exact className="hero__link" activeClassName="hero__link_active" to="/todos/new">
          Add todo
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/todos">
          <ConnectedTodoList />
          <Filter />
        </Route>
        <Route path="/todos/new">
          <Form />
        </Route>
        <Route exact path="/">
          <Redirect to="/todos" />
        </Route>
      </Switch>
    </div>
  );
}
