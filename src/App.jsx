import React, {Component} from 'react';
import Header from './Header.jsx';
import CodeTextArea from './CodeTextArea.jsx';
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

  updateCode(newCode){
    console.log(`old code state: ${this.state.code}`);
    this.setState({code: newCode});
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
      this.setState({evaluated_code :eval(code) });
  }

  render() {
    var options = {
        lineNumbers: true
    };
    return (
      <div>
        <Header />
        <h1>Hello and Lets Code :)</h1>
        <form  onSubmit={this.handleSubmit}>
          <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} evaluateCode={this.evaluateCode}  />
          <input type="submit" value="Evaluate Code" />
        </form>
        <span >result =  {this.state.evaluated_code}</span>
        <Footer/>
      </div>
    );
  }
}
export default App;
