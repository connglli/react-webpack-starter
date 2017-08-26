import React, { Component } from 'react';
import styles from './index.scss';

class App extends Component {
  state = {
    input: -1,
  };
  
  onInputChange = e => {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <div>
        <span className={styles.hhhhh1}>Hello, Global</span>
        <h2 className="hhhhh2">Hello, Local</h2>
        <input value={this.state.input} type="text" onChange={this.onInputChange} />
      </div>
    );
  }
}

export default App;
