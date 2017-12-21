import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Login} from "./Login.jsx"
import {Signup} from "./Signup.jsx"
import {Code} from "./Code.jsx"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <h1>Hello and Lets Code :)</h1>
            <div>
              <Route path="/room/:id" component={Code} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}
export default App;
