import React, {Component} from 'react';
import CodeMirror from 'react-codemirror';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import Video from './Video';


const PORT = process.env.PORT || 3001;  // comment this line when deploying to heroku

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
        code : '',
        evaluated_code : "",
        room : this.props.match.url,
        type : '',
        cursor: {
          line: 0,
          ch: 0
        }
      }
    };

    this.evaluateCode = this.evaluateCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }

  async componentWillMount() {
    const data =  await fetch('/get-port');
    const json =  await data.json();
    console.log(`json from node server: ${json}`);
    this.setState(json);

    const initialMsg ={
      room: this.props.match.url,
      type: "initialMsg",
      cursor: {
        line: this.refs.editor.getCodeMirror().getCursor().line,
        ch:this.refs.editor.getCodeMirror().getCursor().ch
      }
    }
    const url = `ws://${window.location.hostname}:${PORT}`; // for localhost only. comment when deploying
    // const url = `wss://${window.location.hostname}:${window.location.port}`; //for deployment only. uncomment when deploying
    console.log(`url:${url}`);
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('connected to server');
      // send initial msg
      this.socket.send(JSON.stringify(initialMsg));
    }
    this.socket.onmessage = (t) => {
      const newMessage = JSON.parse(t.data);

      switch(newMessage.type) {
        case "updateCode":
          this.setState( {message: newMessage});
          this.refs.editor.getCodeMirror().setCursor(this.state.message.cursor.line, this.state.message.cursor.ch);
        break;

        case "evaluateCode":
          this.setState ({message:newMessage});
          this.refs.editor.getCodeMirror().setCursor(this.state.message.cursor.line, this.state.message.cursor.ch);
        break;
      }
    }
  }

  updateCode(newCode){
    const message = {
        code: newCode,
        evaluated_code: this.state.message.evaluated_code,
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
      let message = {
        code: code,
        evaluated_code: "",
        room: this.state.message.room,
        type: "evaluateCode",
        cursor: {line: this.refs.editor.getCodeMirror().getCursor().line, ch:this.refs.editor.getCodeMirror().getCursor().ch}
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

      const gridInstance = (
        <Grid>
          <Row className="show-grid">
            <Col xs={4} md={10} sm={8}>

                <form  onSubmit={this.handleSubmit}>

                  <CodeMirror value={this.state.message.code} ref="editor" onChange={this.updateCode} options={options}  evaluateCode={this.evaluateCode}  autoFocus={true}/>
                  <span >
                    <small style={{color: "tomato",fontSize: "15px"}}>Output</small>
                    <Button style={{float: "right"}} type="submit">  Run ...  </Button>
                    <br/>
                    <span style={{color: "white",fontSize: "15px"}}>
                    {this.state.message.evaluated_code}
                    </span>
                  </span>
                </form>
            </Col>
            <Col xs={1} md={2} sm={2}>
                <Video room = {this.state.message.room} />
            </Col>
          </Row>
        </Grid>
    )

    return (
      gridInstance
    );
  }
}
