import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';

const App = () => (<div>
  <span className={styles.hhhhh1}>Hello, Global</span>
  <h2 className='hhhhh2'>Hello, Local</h2>
</div>);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}