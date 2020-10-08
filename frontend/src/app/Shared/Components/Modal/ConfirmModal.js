import React, { Component } from 'react'
import Modal from './Modal';


class ConfirmModal extends Component {

    onSubmitHandler = () => {
        this.props.submit(this.props.type)
        this.props.close();
    }

    render() {
        return (
            <Modal className="confirm__modal" show={this.props.show}>
                <h4 className="confirm__modal-message">{this.props.message}</h4>
                <button onClick={this.onSubmitHandler}
                    className="btn btn__success confirm__modal-btn-success">Yes</button>
                <button
                    onClick={this.props.close}
                    className="btn btn__danger confirm__modal-btn-danger">No</button>
            </Modal>
        )
    }
}

export default ConfirmModal;