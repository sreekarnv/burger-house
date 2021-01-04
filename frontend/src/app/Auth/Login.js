import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import Alert from '../Shared/Components/Alert/Alert';
import FormInput from '../Shared/Components/Form/FormInput';

import * as actionTypes from './../store/actions/authActions';

const Login = (props) => {
	const {
		user,
		loginUserInit,
		loginUser,
		cartValue,
		loginUserError,
		resetRegisterUserStatus,
		registerUserStatus,
	} = props;
	const { replace } = useHistory();
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		if (registerUserStatus) {
			setShowAlert(true);
			let timer = setTimeout(() => {
				resetRegisterUserStatus();
				setShowAlert(false);
			}, 8000);

			return () => clearTimeout(timer);
		}
	}, [resetRegisterUserStatus, registerUserStatus]);

	useEffect(() => {
		if (loginUserError) {
			setShowAlert(true);
		}
	}, [loginUserError]);

	useEffect(() => {
		if (user && cartValue > 0) {
			return replace('/cart');
		}

		if (user) {
			return replace('/menu');
		}
	}, [user, replace, cartValue]);

	const [formState, setformState] = useState({
		email: {
			type: 'email',
			label: 'Email',
			required: true,
			value: '',
		},
		password: {
			type: 'password',
			label: 'Password',
			required: true,
			value: '',
		},
	});

	const onFormSubmit = (e) => {
		e.preventDefault();
		const data = {
			email: formState.email.value,
			password: formState.password.value,
		};
		loginUser(data);
	};

	return (
		<>
			{showAlert && loginUserError && (
				<Alert show={loginUserError} variant='danger'>
					{loginUserError.message}
				</Alert>
			)}

			{showAlert && registerUserStatus && (
				<Alert
					show={registerUserStatus === 'success' ? true : false}
					variant='success'>
					Account Created Successfully. Check your email to activate your
					account
				</Alert>
			)}
			<section className='auth-form login'>
				<form
					className='auth-form__form'
					autoComplete='off'
					onSubmit={onFormSubmit}>
					<div className='form__group'>
						<h2 className='heading-1 u-text-primary u-ftwt-400'>Login</h2>
					</div>

					{Object.keys(formState).map((el) => {
						return (
							<FormInput
								formState={formState}
								key={el}
								id={el}
								onFormStateChange={setformState}
							/>
						);
					})}

					<div className='form__group'>
						<button className='btn btn__tertiary auth-form__cta' type='submit'>
							{loginUserInit ? 'Loading...' : 'Login'}
						</button>
					</div>

					<div className='form__group'>
						<NavLink
							to='/send-email-confirmation'
							className='form__link  u-text-primary'>
							Account Not Verified ? Resend User Verification Email
						</NavLink>
					</div>
				</form>
			</section>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		loginUserInit: state.auth.loginUserInit,
		loginUserError: state.auth.loginUserError,
		cartValue: state.cart.cartValue,
		registerUserStatus: state.auth.registerUserStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: (data) => dispatch(actionTypes.loginUser(data)),
		resetRegisterUserStatus: () =>
			dispatch(actionTypes.resetRegisterUserStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
