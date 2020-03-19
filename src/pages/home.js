import React, { Component } from 'react';
import logo from '../assets/boilerplate/logo.svg';
import '../css/home.css';


class Home extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to <code>react-web3</code>
          </p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            A boilerplate Ethereum dev environment
          </p>
          <a
            className="App-link"
            href="https://github.com/ryoungblom/react-web3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </a>
        </header>
      </div>
    );
  }
}

export default Home;
