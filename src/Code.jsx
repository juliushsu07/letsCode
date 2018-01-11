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
        // TODO set room to this.props
        room : this.props.match.url,
        type : '',
        mode : 'javascript',
        cursor: {
          line: 0,
          ch: 0
        }
      },
      evaluated_code : "",
      startVideo : false
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
        case "changeRoom":

        break;
        case "updateCode":
          this.setState( {message: newMessage});
          this.refs.editor.getCodeMirror().setCursor(this.state.message.cursor.line, this.state.message.cursor.ch);
          console.log(this.state.message);
        break;
      }
    }
  }

  updateCode(newCode){
    // console.log(this.refs.editor.getCodeMirror().getCursor().line);
    // console.log(this.refs.editor.getCodeMirror().getCursor().ch);

    const message = {
        code: newCode,
        room: this.state.message.room,
        type: "updateCode",
        cursor: {line: this.refs.editor.getCodeMirror().getCursor().line, ch:this.refs.editor.getCodeMirror().getCursor().ch}
    }

    this.socket.send(JSON.stringify(message));
  }

  handleSubmit(event){
    event.preventDefault();
    this.evaluateCode(this.state.message.code);
  }

  evaluateCode (code){
      try {
        const evaluated_code = eval(code);
        if (evaluated_code == undefined){
          this.setState({evaluated_code :"undefined" });
        } else {
          this.setState({evaluated_code :evaluated_code });
        }
      } catch (e) {
        this.setState({evaluated_code: e.toString()});
      }
  }

  render() {
    console.log("Rendering <Code/>");

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
          <CodeMirror ref="editor" value={this.state.message.code} onChange={this.updateCode} options={options}  evaluateCode={this.evaluateCode}  autoFocus={true}/>
          <span >
            <small style={{color: "blue",fontSize: "15px"}}>Output</small><br/>{JSON.stringify(this.state.evaluated_code)}
          </span>
        </form>
        <Video room = {this.state.message.room} />
      </div>
    );
  }
}