import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';

export class Welcome extends Component {

  roomIdGenerator() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return "/room/"+text;
    this.setState({room :`/room/${text}` });
  }

  render(){
    console.log("Rendering <Welcome/>")
    return(
        <Jumbotron>
          <h1>let's Code</h1>
          <p>This is a simple code play ground that allows you to share code in real time.</p>
          <Button bsStyle="default" bsSize="large"><Link to={this.roomIdGenerator()}>Code</Link></Button>
        </Jumbotron>
    );
  }
}