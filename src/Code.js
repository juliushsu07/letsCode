import React, {Component} from 'react';
import CodeMirror from 'react-codemirror';

const isBrowser = typeof window !== 'undefined';
isBrowser ? function(){
  require('codemirror/mode/javascript/javascript');
  require('codemirror/addon/lint/lint');
  require('codemirror/addon/lint/javascript-lint');
}() : undefined;

console.log("Rendering <Code/>")
export class Code extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      message : {
        code : this.props.code,
        // TODO set room to this.props
        room : this.props.match.url,
        type : '',
        mode : 'javascript'
      },
      evaluated_code : ""
    };

    this.evaluateCode = this.evaluateCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {
    const initialMsg ={
      room: this.props.match.url,
      type: "initialMsg"
    }
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => {
      console.log('connected to server');
      console.log(initialMsg)
      // send initial msg
      this.socket.send(JSON.stringify(initialMsg));
    }
    this.socket.onmessage = (t) => {
      const newMessage = JSON.parse(t.data);
      console.log("onclientrecieve", newMessage);

      switch(newMessage.type) {
        case "changeRoom":

        break;
        case "updateCode":
          this.setState( {message: newMessage});
          console.log(this.state.message);
        break;
      }
    }
  }

  updateCode(newCode){
    const message = {
        code: newCode,
        room: this.state.message.room,
        type: "updateCode"
    }
    this.setState({
      code: newCode
    });
    this.socket.send(JSON.stringify(message));
  }

  handleSubmit(event){
    event.preventDefault();
    this.evaluateCode(this.state.message.code);
  }

  evaluateCode (code){
      try {
        const evaluated_code = eval(code);
        if (evaluated_code === undefined){
          this.setState({evaluated_code :"undefined" });
        } else {
          this.setState({evaluated_code :evaluated_code });
        }
      } catch (e) {
        this.setState({evaluated_code: e.toString()});
      }
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
            <small style={{color: "blue",fontSize: "15px"}}>Output</small><br/>{JSON.stringify(this.state.evaluated_code)}
          </span>
        </form>
      </div>
    );
  }
}
