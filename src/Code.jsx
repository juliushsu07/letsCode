import React, {Component} from 'react';
import CodeMirror from 'react-codemirror';
import SimpleWebRTC from 'simplewebrtc';


export class Code extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      message : {
        code : '',
        // TODO set room to this.props
        room : this.props.match.url,
        type : ''
      },
      evaluated_code : ""
    };

    this.evaluateCode = this.evaluateCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {
    const room = this.state.message.room;

    // Initialize webrtc
    const webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remoteVideos',
      // immediately ask for camera access
      autoRequestMedia: true
    })

    webrtc.on('readyToCall', function () {
        // you can name it anything
        webrtc.joinRoom(room);
    });

    const initialMsg ={
      room: room,
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
          console.log(this.state.message);
        break;
      }
    }
  }

  componentWillMount () {
        const script = document.createElement("script");

        script.src = "https://simplewebrtc.com/latest-v2.js";
        script.async = true;

        document.body.appendChild(script);
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
    console.log("Rendering <Code/>");

    let options = {
      lineNumbers: true
    };

    return (
      <div>
        <h1>Hello and Lets Code :)</h1>
        <form  onSubmit={this.handleSubmit}>
          <CodeMirror value={this.state.message.code} ref="cm_instance" onChange={this.updateCode} options={options}  evaluateCode={this.evaluateCode} />
          <input type="submit" value="Evaluate Code" />
          <span >result =  {this.state.evaluated_code}</span>
        </form>
        <video id="localVideo"></video>
        <div id="remoteVideos"></div>
      </div>
    );
  }
}