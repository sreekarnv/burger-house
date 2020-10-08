import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './../../Shared/Components/Form/Input';
import Loader from './../../Shared/Components/Loader/Loader';

import { onChangeFormInput } from '../../Shared/Utils/formInput';

import * as authActions from './../../Store/actions/auth';

class VerifyEmail extends Component {
    state = {
        formInput: {
            email: ''
        },
        error: null
    }

    onChangeHandler = e => {
        let formInput = onChangeFormInput(e, { ...this.state })
        this.setState({ ...formInput })
    }

    onSubmitHandler = async e => {
        e.preventDefault();
        await this.props.sendEmailConfirmation(this.state.formInput.email);

        if (this.props.sendEmailStatus === 'success') {
            return this.props.history.replace('/confirm-email-message')
        }
    }

    render() {

        if (this.props.sendEmailInit) {
            return (
                <div className="u-flex-center u-vh-100">
                    <Loader />
                </div>
            )
        }


        return (
            <div className="send-email-confirm">
                <form
                    className="send-email-confirm__form"
                    autoComplete="off"
                    onSubmit={this.onSubmitHandler}
                >
                    <div className="form__group">
                        <h2 className="heading-1 u-text-primary u-ftwt-400">Resend Email Confirmation</h2>
                    </div>

                    <Input
                        name="email"
                        inputtype='input'
                        type='email'
                        label='Email'
                        onChange={this.onChangeHandler}
                        value={this.state.formInput.email} />

                    <Input inputtype='submit' value={'Submit'} variant="tertiary" />
                </form>
                <br />
                {this.props.sendEmailStatus === 'failed' && <p className="send-email-confirm__error u-text-danger">
                    Invalid Email Address
                    </p>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sendEmailInit: state.auth.sendEmailInit,
        sendEmailStatus: state.auth.sendEmailStatus
    }
}


const mapDispatchToProps = dispatch => {
    return {
        sendEmailConfirmation: (email) => dispatch(authActions.sendEmailConfirmation(email))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);