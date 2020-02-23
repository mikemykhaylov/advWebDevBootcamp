import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './components/App';
import 'normalize.css';
import './scss/index.scss';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root'),
);

if (module.hot) {
  module.hot.accept();
}
