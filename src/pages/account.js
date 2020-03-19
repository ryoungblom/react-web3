import React, { Component } from 'react';
import '../App.css';


class Account extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <p> Account: {this.props.account}</p>
          <p> Balance: {this.props.balance}</p>

        </header>
      </div>

    );
  }
}

export default Account;
