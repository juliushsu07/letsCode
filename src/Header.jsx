import React, {Component} from 'react';

class Header extends Component {

  render() {
    return (
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">letsCode</a>
          </div>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Share Code</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Header;
console.log("Rendering <Header/>");