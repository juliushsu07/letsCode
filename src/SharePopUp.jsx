// This component is a modal that popps up when you click the share button
// on the main menu. It takes in props of the curren url and presents it
// to the user so they can coppy it and share with next user.

import React, {Component} from 'react';
import { Button, FormGroup, FormControl, Modal } from 'react-bootstrap';



export default class SharePopUp  extends React.Component {
  constructor(props){
    super(props);
    this.onNothingChange = this.onNothingChange.bind(this);
  }


  state = { showModal: false};

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  onNothingChange(){
    // do nothing lol
  }

  render() {
    const url = `http://localhost:3001${this.props.roomURL}`
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
          className="bsClass"
        >
          Share Code
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Share Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Anyone with the url below will have access to your code share space</h4>
            <hr />
            <FormGroup bsSize="large">
              <FormControl type="text" placeholder="https://localhost:3000/a2c4e {this.state.message.room}" value= {url} onChange = {this.onNothingChange} />
            </FormGroup>
            <hr />
         </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
