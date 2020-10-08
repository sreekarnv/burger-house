import React, { Component } from 'react'
import { connect } from 'react-redux';
import Input from '../../Shared/Components/Form/Input';


import * as authActions from '../../Store/actions/auth';
import { onChangeFormInput, clearFields } from '../../Shared/Utils/formInput';
import Alert from '../../Shared/Components/Alert/Alert';
import UnAuthRoutes from '../../Shared/hoc/UnAuthRoutes';


class Login extends Component {
    state = {
        formInput: {
            email: '',
            password: ''
        },
        showAlert: false,
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
        }, 1500)
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

        return (
            <UnAuthRoutes>
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
                        <Input inputtype='submit' value={this.props.loginInit ? 'Loading...' : 'Login Now'} variant="tertiary" />
                    </form>
                </section>

            </UnAuthRoutes>
        );
    };
};

const mapStateToProps = state => {
    return {
        loginInit: state.auth.loginInit,
        loginStatus: state.auth.loginStatus,
        checkAuthInit: state.auth.checkAuthInit,
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
