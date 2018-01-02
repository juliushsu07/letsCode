import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function roomIdGenerator() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return "/room/"+text;
}

export class Welcome extends Component {
  render(){
    console.log("Rendering <Code/>");
    return(
      <div>
        <h1><Link to={roomIdGenerator()}>Code</Link></h1>
      </div>
    );
  }
}
