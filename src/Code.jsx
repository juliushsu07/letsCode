import React, {Component} from 'react';
import CodeMirror from 'react-codemirror';
import Video from './Video.jsx';


const isBrowser = typeof window !== 'undefined';
isBrowser ? function(){
  require('codemirror/mode/javascript/javascript');
  require('codemirror/addon/lint/lint');
  require('codemirror/addon/lint/javascript-lint');
}() : undefined;


export class Code extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      message : {
        code : '',
        evaluated_code : "",
        room : this.props.match.url,
        type : '',
        mode : 'javascript'
      }
    };

    this.evaluateCode = this.evaluateCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {
    const initialMsg ={
      room: this.state.message.room,
      type: "initialMsg"
    }

    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => {
      console.log('connected to server');
      // send initial msg
      this.socket.send(JSON.stringify(initialMsg));
    }
    this.socket.onmessage = () => {
      const newMessage = JSON.parse(event.data);
      switch(newMessage.type) {
        case "evaluateCode":
          this.setState ({message:newMessage});
        break;
        case "updateCode":
          this.setState( {message: newMessage});
        break;
      }
    }
  }

  updateCode(newCode){
    const message = {
        code: newCode,
        evaluated_code: this.state.message.evaluated_code,
        room: this.state.message.room,
        type: "updateCode"
    }
    this.socket.send(JSON.stringify(message));
  }

  handleSubmit(event){
    event.preventDefault();
    this.evaluateCode(this.state.message.code);
  }

  evaluateCode (code){
      let message = {
        evaluated_code: "",
        room: this.state.message.room,
        type: "evaluateCode"
      };
      try {
        const evaluated_code = eval(code);
        if (evaluated_code == undefined){
          message.evaluated_code = "undefined"
        } else {
          message.evaluated_code = evaluated_code;
        }
      } catch (e) {
          message.evaluated_code = e.toString();
      }
      this.socket.send(JSON.stringify(message));
  }

  render() {


    let options = {
      lineNumbers: true,
      mode: 'javascript',
      lineWrapping: true,
      lint: true,
      gutters: [
        'CodeMirror-lint-markers',
      ]
    };

    return (
      <div>
        <h1>Hello and Lets Code :)</h1>
        <form  onSubmit={this.handleSubmit}>
          <input type="submit" value="Run" />
          <CodeMirror value={this.state.message.code} ref="editor" onChange={this.updateCode} options={options}  evaluateCode={this.evaluateCode}  autoFocus={true}/>
          <span >
            <small style={{color: "blue",fontSize: "15px"}}>Output</small><br/>{this.state.message.evaluated_code}
          </span>
        </form>
        <Video room = {this.state.message.room} />
      </div>
    );
  }
}