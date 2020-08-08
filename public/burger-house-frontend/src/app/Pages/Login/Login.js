import React, { Component } from 'react'
import { connect } from 'react-redux';
import Input from '../../Shared/Components/Form/Input';


import * as authActions from './../../Store/actions/auth';

import { onChangeFormInput, clearFields } from '../../Shared/Utils/formInput';
import Loader from '../../Shared/Components/Loader/Loader';

import Alert from '../../Shared/Components/Alert/Alert';

class Login extends Component {
    state = {
        formInput: {
            email: '',
            password: ''
        },
        isLoading: false,
        showAlert: false
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        setTimeout(() => {
            this.setState({ isLoading: false })
            if (this.props.user) {
                return this.props.history.goBack();
            }
        }, 2000)
    }

    onChangeHandler = e => {
        let formInput = onChangeFormInput(e, { ...this.state })
        this.setState({ ...formInput })
    }

    onCloseHandler = () => {
        this.closeAlertTimer = setTimeout(() => {
            this.setState({ showAlert: false });
            if (this.props.loginStatus === 'success' && this.props.cart) {
                this.props.history.replace('/cart')
            } else if (this.props.loginStatus === 'success' && this.props.user.role === 'admin') {
                this.props.history.replace('/dashboard/manage-orders');
            } else if (this.props.loginStatus === 'success') {
                this.props.history.replace('/menu');
            }
        }, 300)
    }

    onSubmitHandler = async e => {
        e.preventDefault();
        await this.props.loginUser(this.state.formInput)
        let formInput = clearFields(this.state);
        this.setState({ formInput, showAlert: true });
    }

    componentWillUnmount() {
        clearTimeout(this.closeAlertTimer);
    }

    render() {
        if (this.state.isLoading) {
            return <div className="u-flex-center u-vh-100"><Loader /></div>
        }

        return (
            <React.Fragment>
                {this.state.showAlert && this.props.loginStatus &&
                    <Alert
                        show={this.state.showAlert}
                        status={this.props.loginStatus === 'success' ? this.props.loginStatus : this.props.loginStatus.status}
                        message={this.props.loginStatus === 'success'
                            ? "User Logged In Successfully"
                            : this.props.loginStatus.message}
                        close={this.onCloseHandler()}
                    />}
                <section className="login">
                    <form className="login__form" onSubmit={this.onSubmitHandler} autoComplete="off">
                        <div className="form__group">
                            <h2 className="heading-1 u-text-primary u-ftwt-400">Login</h2>
                        </div>
                        <Input
                            name="email"
                            inputtype='input'
                            type='email'
                            label='Email'
                            onChange={this.onChangeHandler}
                            value={this.state.formInput.email} />

                        <Input
                            name="password"
                            inputtype='input'
                            type='password'
                            label='Password'
                            onChange={this.onChangeHandler}
                            value={this.state.formInput.password}
                            minLength={6} />
                        <Input inputtype='submit' value="Login Now" variant="tertiary" />
                    </form>
                </section>

            </React.Fragment>
        );
    };
};

const mapStateToProps = state => {
    return {
        loginInit: state.auth.loginInit,
        loginStatus: state.auth.loginStatus,
        user: state.auth.user,
        cart: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (data) => dispatch(authActions.login(data)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
