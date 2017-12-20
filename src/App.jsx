import React, {Component} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CodeMirror from 'react-codemirror';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user : {
        name : "Anonymous"
      },
      code : `var print = function (something) {return something;}
              print("it works");`,
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

    console.log(`old code state: ${this.state.code}`);
    this.setState({code: newCodeContent});
    console.log(`new code state: ${this.state.code}`);
    console.log(this.state);
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
      <div>
      <Header />
        <Footer/>
          <Header />
          <h1>Hello and Lets Code :)</h1>
          <form  onSubmit={this.handleSubmit}>
            <CodeMirror value={this.state.code} ref="cm_instance" onChange={this.updateCode} options={options} evaluateCode={this.evaluateCode}  />
            <input type="submit" value="Evaluate Code" />
          </form>
          <span >result =  {this.state.evaluated_code}</span>
        <Footer/>
      </div>
    );
  }
}
export default App;
