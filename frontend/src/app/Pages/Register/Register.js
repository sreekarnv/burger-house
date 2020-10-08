import React, { Component } from 'react'
import { connect } from 'react-redux';
import Input from '../../Shared/Components/Form/Input';

import * as authActions from '../../Store/actions/auth';

import { onChangeFormInput, clearFields } from '../../Shared/Utils/formInput';

import Alert from '../../Shared/Components/Alert/Alert';
import UnAuthRoutes from '../../Shared/hoc/UnAuthRoutes';


class Register extends Component {
    state = {
        formInput: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            location: {
                coordinates: null
            },
        },
        showAlert: false
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((res) => {
            console.log(res);
            this.setState({
                formInput: {
                    ...this.state.formInput,
                    location: {
                        coordinates: [res.coords.longitude, res.coords.latitude]
                    }
                }
            })
        });
    }


    onChangeHandler = e => {
        let formInput = onChangeFormInput(e, { ...this.state })
        this.setState({ ...formInput })
    }

    onSubmitHandler = async e => {
        e.preventDefault();
        await this.props.registerUser(this.state.formInput)
        let formInput = clearFields(this.state);

        this.setState({ formInput, showAlert: true })
    }

    onCloseHandler = () => {
        this.closeAlertTimer = setTimeout(() => {
            this.setState({ showAlert: false });
            if (this.props.registerStatus.data.status === 'success') {
                this.props.history.replace('/confirm-email-message')
            }
        }, 2000)
    }

    componentWillUnmount() {
        clearTimeout(this.closeAlertTimer);
    }

    render() {
        return (
            <UnAuthRoutes>
                {this.state.showAlert && this.props.registerStatus &&
                    <Alert
                        show={this.state.showAlert}
                        status={this.props.registerStatus === 'success' ? this.props.registerStatus : this.props.registerStatus.data.status}
                        message={this.props.registerStatus.data.status === 'success'
                            ? "User Created Successfully"
                            : this.props.registerStatus.data.message}
                        close={this.onCloseHandler()}
                    />}
                <section className="register">

                    <form className="register__form" onSubmit={this.onSubmitHandler} autoComplete="off">
                        <div className="form__group">
                            <h2 className="heading-1 u-text-primary u-ftwt-400">Create an Account</h2>
                        </div>
                        <Input
                            name="name"
                            inputtype="input"
                            type="text"
                            label="Name"
                            onChange={this.onChangeHandler}
                            value={this.state.formInput.name}
                        />

                        <Input
                            name="email"
                            inputtype="input"
                            type="email"
                            label="Email"
                            onChange={this.onChangeHandler}
                            value={this.state.formInput.email}
                        />

                        <Input
                            name="password"
                            inputtype="input"
                            type="password"
                            label="Password"
                            onChange={this.onChangeHandler}
                            value={this.state.formInput.password}
                            minLength={6}
                        />

                        <Input
                            name="passwordConfirm"
                            inputtype="input"
                            type="password"
                            label="Password Confirm"
                            onChange={this.onChangeHandler}
                            value={this.state.formInput.passwordConfirm}
                            minLength={6}
                        />

                        <Input
                            inputtype='submit'
                            value={!this.props.registerInit ? 'Register' : 'Loading....'}
                            variant="tertiary" />
                    </form>
                </section>
            </UnAuthRoutes>
        );
    };
};

const mapStateToProps = state => {
    return {
        registerInit: state.auth.registerInit,
        registerStatus: state.auth.registerStatus,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (data) => dispatch(authActions.register(data)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);
