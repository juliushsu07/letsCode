import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { BrowserRouter, Switch, Router, Route, Link } from 'react-router-dom';
import {Welcome} from './Welcome.jsx';
import {Code} from './Code.jsx';
import {Login} from './Login.jsx';
import {Signup} from './Signup.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user : {
        name : "Anonymous"
      }
    }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <BrowserRouter >
        <div>
          <Route path="*" component={Header} />
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/room/:id" exact component={Code}/>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

