import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {closeModal} from "./modalActions";
import RegisterForm from "../auth/Register/RegisterForm";


class RegisterModal extends Component {
    render() {
      const { closeModal } = this.props;
        return (
            <Modal
                size='mini'
                open={true}
                onClose={() => closeModal()}
            >
                <Modal.Header>
                    Sign Up to Re-vents!
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <RegisterForm />
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

export default connect(null, mapDistpachToProps)(RegisterModal);