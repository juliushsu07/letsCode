import React, {Component} from 'react';
import CodeMirror from 'react-codemirror';

function getRoomIdFromURL() {
  console.log("in getRoomID @CODE: ", window.location.pathname);
  return window.location.pathname;
}

export class Code extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      user : {
        name : "Anonymous"
      },
      message : {
        code : '',
        // TODO set room to this.props
        room : getRoomIdFromURL(),
        type : ''
      },
      evaluated_code : ""
    };

    this.evaluateCode = this.evaluateCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {
    const initialMsg ={
      room: getRoomIdFromURL(),
      type: "initialMsg"
    }
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = () => {
      console.log('connected to server');
      console.log(initialMsg)
      // send initial msg
      this.socket.send(JSON.stringify(initialMsg));
    }
    this.socket.onmessage = () => {
      const newMessage = JSON.parse(event.data);
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
    let options = {
      lineNumbers: true
    };
    return (
      <div>
        <form  onSubmit={this.handleSubmit}>
          <CodeMirror value={this.state.message.code} ref="cm_instance" onChange={this.updateCode} options={options}  evaluateCode={this.evaluateCode} />
          <input type="submit" value="Evaluate Code" />
          <span >result =  {this.state.evaluated_code}</span>
        </form>
      </div>
    );
  }
}