import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import { BrowserRouter, Switch, Router, Route, Link } from 'react-router-dom';
import {Welcome} from './Welcome.js';
import {Code} from "./Code.js";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user : {
        name : "Anonymous"
      }
    }
  }

  // state = { message: "Loading..." };

  // Load some data from the server to demonstrate communication between
  // the client and Node
  async componentDidMount() {

    // try {
      // const HOST = 'ws://localhost:3001/';
      // this.socket = new WebSocket(HOST);
      //  this.socket.onopen = () => {
      //    console.log('connected to server');
       // }
      // const data = await fetch('/example-route');
      // const json = await data.json();
      // this.setState(json);
    // } catch (e) {
    //   console.log("Failed to fetch message", e);
    // }
  }

  render() {
    return (

      <BrowserRouter >
        <div>
          <Route path="*" component={Header} />
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/room/:id" exact component={Code}/>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <p>
      //     {this.state.message}
      //   </p>
      //   <Code />
      // </div>

    );
  }
}

export default App;
