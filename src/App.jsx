import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CodeMirror from 'react-codemirror';

class App extends Component {

  constructor(props){
    super(props);

    this.state =
    {
      user : {
        name : "Anonymous"
      },
      code : `console.log("Hello, world!!")`
    }

    this.updateCode = this.updateCode.bind(this);

  }


  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    this.socket.onopen = (e) => {
      console.log('connected to server');
    }

    this.socket.onmessage = (e) => {
      const data = JSON.parse(event.data);
    }
  }

  updateCode(newCodeContent){
    const newCode = {
        username: this.state.user.name ,
        content: newCodeContent
    }
    this.socket.send(JSON.stringify(newCode));
    this.setState({code: newCodeContent});
    console.log(this.state.code);
  }


  render() {
    var options = {
        lineNumbers: true
    };
    return (
      <div>
      <Header />
      <h1>Hello and Lets Code :)</h1>
      <CodeMirror value={this.state.user.code} onChange={this.updateCode} options={options} />
      <Footer/>
      </div>
    );
  }
}
export default App;
