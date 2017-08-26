import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

import App from './app';

// we enable react-hot-loader only not in production
const render = process.env.NODE_ENV === 'production'
  ? (Component, el) => { ReactDOM.render(<Component />, el); }
  // react-hot-loader support, wrap it in AppContainer
  : (Component, el) => { ReactDOM.render(<AppContainer><Component /></AppContainer>, el); };

const rootEl = document.getElementById('root');

render(App, rootEl);

// HMR support
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./app', () => {
    render(App, rootEl);
  });
}
