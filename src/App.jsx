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

  updateCode(newCode){
    this.setState({code: newCode});
    console.log(this.state);
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
