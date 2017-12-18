import React, {Component} from 'react';

class CodeTextArea extends Component {

  render() {
    // console.log(this.props)
    return (
      <form  onSubmit={this.props.handleSubmit}>
        <textarea className="form-control" rows="5" id="code_text_area" onChange= {this.props.changeTextHandler }/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default CodeTextArea;
console.log("Rendering <CodeArea/>");
