import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app.jsx';

const rootEl = document.getElementById('root');

// react-hot-loader support, wrap it in AppContainer
const render = (Component, el) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    el
  );
};

render(App, rootEl);

// HMR support
if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    render(App, rootEl);
  });
}