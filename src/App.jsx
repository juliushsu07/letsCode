import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Welcome} from './Welcome.jsx';
import {Code} from "./Code.jsx"
import {Login} from "./Login.jsx"
import {Signup} from "./Signup.jsx"


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
      <Router room = {this.state.room}>
        <div>
          <Header />
          <div>
            <Route path="/" exact component={Welcome} />
            <Route path="/room/:id" exact component={Code} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" component={Signup} />
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

