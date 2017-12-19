import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">letsCode</a>
          </div>
          <div>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/">Share Code</Link></li>
              <li><Link to="code">Code</Link></li>
              <li><Link to="signup">Signup</Link></li>
              <li><Link to="login">Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;
console.log("Rendering <Header/>");
