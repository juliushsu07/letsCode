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


  async componentDidMount() {

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
    );
  }
}

export default App;
