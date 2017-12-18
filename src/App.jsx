import React, {Component} from 'react';
import Header from './Header.jsx';
import CodeTextArea from './CodeTextArea.jsx';
import Footer from './Footer.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      code_text: "",
      evaluated_code:"hmm"
    }; //end of set initial state Object
    this.changeTextHandler = this.changeTextHandler.bind(this)
    this.evaluateCode = this.evaluateCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  changeTextHandler (event) {
    let code_text = event.target.value;
    console.log(`old code state: ${this.state.code_text}`);
    this.setState({code_text :code_text });
    console.log(`new code state: ${this.state.code_text}`);
    // this.setState({evaluated_code :eval(this.state.code_text) });
  }

  handleSubmit(event){
    event.preventDefault();
    this.evaluateCode(this.state.code_text);
    console.log("evaluted code: ", this.state.evaluated_code);
  }

  evaluateCode (code){
    // if(event.key === "Enter"){
      console.log("code_text: ", code);
      this.setState({evaluated_code :eval(code) });

    // }
  }

  render() {
    return (
      <div>
      <Header />
      <h1>Hello and Lets Code :)</h1>
      <CodeTextArea  evaluateCode={this.evaluateCode} changeTextHandler={this.changeTextHandler} handleSubmit={this.handleSubmit}/>
      <span >result =  {this.state.evaluated_code}</span>
      <Footer/>
      </div>
    );
  }
}
export default App;
