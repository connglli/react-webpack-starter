import React, { Component } from 'react';
import './index.scss';

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
        <h2>Hello, enjoy it</h2>
        <input value={this.state.input} type="text" onChange={this.onInputChange} />
      </div>
    );
  }
}

export default App;
