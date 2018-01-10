import React, {Component} from 'react';

export default class Footer extends Component {

  render() {
    console.log("Rendering <Footer/>");

    return (
     <nav className="  navbar-default navbar-fixed-bottom">
        <div className="container-fluid">
          <div className="navbar-header">
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Place Call</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
