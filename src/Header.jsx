import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { Modal, ModalHeader, ModalFooter, ModalBody} from 'elemental';
import SharePopUp from "./SharePopUp.jsx"

export default class Header extends React.Component {
  state = { show: false }

  render() {
    let close = () => this.setState({ show: false });
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">letsCode</a>
          </div>
          <div>
            <ul className="nav navbar-nav navbar-right">
               <li> <SharePopUp /></li>
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
// export default Header;
console.log("Rendering <Header/>");
