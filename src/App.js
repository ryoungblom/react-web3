import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Web3 from 'web3'

import Navigation from './components/nav.js'

import Home from './pages/home.js';
import Account from './pages/account.js';
import Contract from './pages/contract.js';
import Error from './pages/error.js';


class App extends Component {

  async componentWillMount() {
    await this.runWeb3()
    await this.blockchain()
    this.forceUpdate()
  }


  componentDidMount(){
    document.title = "react-web3"
  }


  async componentWillUnmount() {
    clearInterval(this.interval);
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: '',
      loading: true
    }
  }


  async isInstalled() {
     if (typeof Web3 !== 'undefined'){
        console.log('Web3 Provider is installed')
     }
     else{
        console.log('No Web3 Provider!')
     }
  }

  async isLocked(web3) {
     web3.eth.getAccounts(function(err, accounts){
        if (err != null) {
           console.log(err)
        }
        else if (accounts.length === 0) {
           console.log('Web3 Provider is locked')
        }
        else {
           console.log('Web3 Provider is unlocked')
        }
     });
  }


  async runWeb3() {

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask or similar!')
    }
  }


  async blockchain() {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    this.isInstalled();
    this.isLocked(web3);

    const accounts = await web3.eth.getAccounts()
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    var balance = balanceInWei/1000000000000000000
    var account = accounts[0]

    console.log("Account: " + account)
    console.log("Balance: " + balance)

    this.setState({ account: accounts[0], balance: balance, loading: false })
  }


  render() {
    return (
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" render={props =>
               (<Home {...props} account={this.state.account} balance={this.state.balance}/>)
             } exact/>
             <Route path="/account" render={props =>
               (<Account {...props} account={this.state.account} balance={this.state.balance}/>)
             } exact/>
             <Route path="/contract" render={props =>
               (<Contract {...props} account={this.state.account} balance={this.state.balance}/>)
             } exact/>

             <Route component={Error}/>
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
