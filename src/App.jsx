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
  }


  render() {
    let options = {
        lineNumbers: true
    };

    return (
      <div>
      <Header />
      <h1>Hello and Lets Code :)</h1>
      <CodeMirror value={this.state.code} ref="cm_instance" onChange={this.updateCode} options={options} />
      <Footer/>
      </div>
    );
  }
}
export default App;
