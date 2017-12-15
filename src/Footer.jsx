import React, {Component} from 'react';

class Footer extends Component {

  render() {
    return (
     <nav class="  navbar-default navbar-fixed-bottom">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">letsChat</a>
          </div>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Share Code</a></li>
            <li><a href="#">Chat</a></li>
            <li><a href="#">Place Call</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Footer;
console.log("Rendering <Footer/>");
