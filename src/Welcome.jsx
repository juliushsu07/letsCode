import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export class Welcome extends Component {

  roomIdGenerator() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return "/room/"+text;
  }

  render(){
    console.log("Rendering <Welcome/>")
    return(
      <div>
        <h1><Link to={this.roomIdGenerator()}>Code</Link></h1>
      </div>
    );
  }
}
