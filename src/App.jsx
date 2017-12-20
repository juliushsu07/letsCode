import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CodeMirror from 'react-codemirror';
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
      code : '',
      evaluated_code:"initial unevaluated CodeText"
    }; //end of set initial state Object

    this.evaluateCode = this.evaluateCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({code: newCodeContent});
  }

  handleSubmit(event){
    event.preventDefault();
    this.evaluateCode(this.state.code);
    console.log("evaluted code: ", this.state.evaluated_code);
  }

  evaluateCode (code){
      console.log("code_text: ", code);
      try {
        const evaluated_code = eval(code);
        if (evaluated_code == undefined){
          this.setState({evaluated_code :"undefined" });
        } else {
          this.setState({evaluated_code :evaluated_code });
        }
      } catch (e) {
        // console.log(`error detected: ${e}`);
        // run in case of an error
        this.setState({evaluated_code: e.toString()});
      }
  }


  render() {
    let options = {
        lineNumbers: true
    };

    return (
      <Router>
        <div>
          <Header />
          <h1>Hello and Lets Code :)</h1>

            <div>
              <Route pathDefault="/code" render={ () => {
                return (
                  <form  onSubmit={this.handleSubmit}>
                    <CodeMirror value={this.state.code} ref="cm_instance" onChange={this.updateCode} options={options}  evaluateCode={this.evaluateCode} />
                    <input type="submit" value="Evaluate Code" />
                    <span >result =  {this.state.evaluated_code}</span>
                  </form>
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
