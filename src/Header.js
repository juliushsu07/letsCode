import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SharePopUp from "./SharePopUp.js";
import { Navbar, NavItem, Nav } from 'react-bootstrap';


export default class Header  extends React.Component {
  render() {

    let links;
    const roomURL = this.props.match.url

    if (roomURL.indexOf("/room") >= 0) {
      links = (
          <SharePopUp roomURL = {roomURL}/>
      )

    } else{
      links = (
        <ul className="nav navbar-nav navbar-right">
        </ul>
      )
    }

    return (
        <Navbar inverse collapseOnSelect fixedTop="true">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">letsCode</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
                {links}
            </Nav>
          </Navbar.Collapse>
        </Navbar>



    );
  }
}
