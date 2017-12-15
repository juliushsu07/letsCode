import React, {Component} from 'react';
import Header from './Header.jsx';
import Embed from 'react-runkit';
import Footer from './Footer.jsx';

class App extends Component {

  constructor(props){
    super(props);

    this.state =
    {
      user: {
        name: "Anonymous"
      },
      code:""
    }

    this.onChangeCode = this.onChangeCode.bind(this);

  }

  onChangeCode(e){
    let newCode = e.target.value
    console.log(newCode);
  }

  render() {
    return (
      <div>
      <Header />
      <h1>Hello and Lets Code :)</h1>
      <Embed onChangeCode = {this.onChangeCode} />
      <Footer/>
      </div>
    );
  }
}
export default App;
