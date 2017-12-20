import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Login} from "./Login.jsx"
import {Signup} from "./Signup.jsx"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user : {
        name : "Anonymous"
      },
      code : `var print = function (something) {return something;}
              print("it works");`,
    }; //end of set initial state Object

    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => {
      console.log('connected to server');
    }
    this.socket.onmessage = () => {
      const data = JSON.parse(event.data);
      this.setState({code: data.content});
    }
  }


  updateCode(newCodeContent){
    const newCode = {
        content: newCodeContent
    }
    this.socket.send(JSON.stringify(newCode));

    console.log(`old code state: ${this.state.code}`);
    this.setState({code: newCodeContent});
    console.log(`new code state: ${this.state.code}`);
    console.log(this.state);
  }

  render() {

    return (
      <Router>
        <div>
          <Header />
          <h1>Hello and Lets Code :)</h1>
           <textarea value={this.state.code} className="klipse" onChange={this.updateCode} />
            <div>
              <Route path="/code" render={ () => {
                return (
                   <textarea />
                );
              }}/>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </div>


          <Footer/>
        </div>
      </Router>
    );
  }
}
export default App;
