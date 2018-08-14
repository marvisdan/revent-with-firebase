import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import LoginForm from "../auth/Login/LoginForm";
import { closeModal } from "./modalActions";

class LoginModal extends Component {
  render() {
    const { closeModal } = this.props;
    return (
      <Modal size="mini" open={true} onClose={() => closeModal()}>
        <Modal.Header>Login to Re-vents</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDistpachToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  null,
  mapDistpachToProps
)(LoginModal);
