import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
