import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';

ReactDOM.render(<div>
  <h1 className={styles.hhhhh1}>Hello, Global</h1>
  <h2 className='hhhhh2'>Hello, Local</h2>
  </div>,
  document.getElementById('root')
);