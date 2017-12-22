import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SharePopUp from "./SharePopUp.jsx"

export default class Header extends React.Component {
  state = { show: false }

class Header extends Component {

  roomIdGenerator() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return "/room/"+text;
  }

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
              <li><Link to={this.roomIdGenerator()}>Code</Link></li>
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
