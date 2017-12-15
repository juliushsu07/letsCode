import React, {Component} from 'react';
import Header from './Header.jsx';
import CodeTextArea from './CodeTextArea.jsx';
import Footer from './Footer.jsx';

class App extends Component {
  render() {
    return (
      <div>
      <Header />
      <h1>Hello and Lets Code :)</h1>
      <CodeTextArea/>
      <Footer/>
      </div>
    );
  }
}
export default App;
