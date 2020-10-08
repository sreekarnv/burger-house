import React, { Component } from 'react';


class ConfirmRegistration extends Component {
    render() {
        return (
            <div className="register__confirm">
                <h2 className="register__confirm-text">
                    <span className="register__confirm-text--1">Thanks For Creating Your Account</span> <br />
                    <span className="register__confirm-text--2">Please verify your email....</span>
                </h2>
                <button
                    onClick={() => this.props.history.replace('/')}
                    className="btn btn__tertiary">Back to Home</button>
            </div>
        )
    }
}

export default ConfirmRegistration;
