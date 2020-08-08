import React, { Component } from 'react'
import Input from '../../../../Shared/Components/Form/Input'
import { connect } from 'react-redux';

import Alert from '../../../../Shared/Components/Alert/Alert';

import { onChangeFormInput } from '../../../../Shared/Utils/formInput';

import * as authActions from '../../../../Store/actions/auth';


class UpdateUserPassword extends Component {
    state = {
        formInput: {
            passwordCurrent: '',
            password: '',
            passwordConfirm: '',
        },
        alert: {
            show: false,
            status: '',
            message: '',
        },
    }

    showAlertHandler = (message, status) => {
        this.setState({
            ...this.state,
            alert: {
                show: true,
                status,
                message,
            }
        })
    }

    onCloseHandler = () => {
        this.closeAlertTimer = setTimeout(() => {
            this.setState({
                ...this.state,
                alert: {
                    show: false, status: '', message: ''
                }
            });
        }, 2000)
    }

    onChangeHandler = e => {
        let formInput = onChangeFormInput(e, { ...this.state })
        this.setState({ ...formInput })
    }

    onSubmitHandler = async e => {
        e.preventDefault();
        await this.props.updateUserPassword(this.state.formInput)
        let message, status;
        if (this.props.userPasswordStatus === 'success') {
            status = this.props.userPasswordStatus
            message = 'User Password updated Successfully'
            this.showAlertHandler(message, status)

            this.LogoutTimer = setTimeout(() => {
                this.props.history.replace('/logout');
            }, 1500)

        } else {
            status = this.props.userPasswordStatus.status;
            message = this.props.userPasswordStatus.message;
            this.showAlertHandler(message, status)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.LogoutTimer)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.alert.status && <Alert
                    close={this.onCloseHandler()}
                    show={this.state.alert.show}
                    status={this.state.alert.status}
                    message={this.state.alert.message}
                />}
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form__group">
                        <h2 className="heading-1 u-text-primary u-ftwt-400">
                            Update User Password
                    </h2>
                    </div>
                    <Input
                        inputtype="input"
                        name="passwordCurrent"
                        type="password"
                        label="Current Password"
                        onChange={this.onChangeHandler}
                        value={this.state.formInput.passwordCurrent}
                        minLength={6}
                    />

                    <Input
                        inputtype="input"
                        name="password"
                        type="password"
                        label="Password"
                        onChange={this.onChangeHandler}
                        value={this.state.formInput.password}
                        minLength={6}
                    />

                    <Input
                        inputtype="input"
                        name="passwordConfirm"
                        type="password"
                        label="Password Confirm"
                        onChange={this.onChangeHandler}
                        value={this.state.formInput.passwordConfirm}
                        minLength={6}
                    />

                    <Input
                        inputtype="submit"
                        value="update password"
                        variant="tertiary"
                    />
                </form >

            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.updateUserPasswordInit,
        userPasswordStatus: state.auth.updateUserPasswordStatus,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserPassword: (data) => dispatch(authActions.updateCurrentUserPassword(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserPassword);
