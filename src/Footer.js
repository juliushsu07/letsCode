import React, {Component} from 'react';

export default class Footer extends Component {

  render() {
    console.log("Rendering <Footer/>");

    return (
     <nav className="  navbar-default navbar-fixed-bottom">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">letsChat</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Share Code</a></li>
            <li><a href="#">Chat</a></li>
            <li><a href="#">Place Call</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}