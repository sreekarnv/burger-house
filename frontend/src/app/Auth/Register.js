import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import FormInput from "../shared/components/Form/FormInput";
import Alert from "../shared/components/Alert/Alert";

import ToggleSwitch from "./../shared/components/Buttons/ToggleSwitch";

import * as actionTypes from "./../store/actions/authActions";

const Register = (props) => {
	const {
		user,
		registerUserInit,
		registerUser,
		registerUserError,
		// sendEmailInit,
		registerUserStatus,
	} = props;
	const { replace } = useHistory();
	const [showAlert, setShowAlert] = useState(false);
	const [allowLocation, setallowLocation] = useState(false);

	useEffect(() => {
		if (user) {
			return replace("/menu");
		}
	}, [user, replace]);

	useEffect(() => {
		if (registerUserStatus === "success") {
			return replace("/login");
		}
	}, [registerUserStatus, replace]);

	const [location, setLocation] = useState({ coordinates: [] });

	const [formState, setformState] = useState({
		name: {
			type: "text",
			label: "Name",
			required: true,
			value: "",
		},
		email: {
			type: "email",
			label: "Email",
			required: true,
			value: "",
		},
		password: {
			type: "password",
			label: "Password",
			required: true,
			value: "",
		},
		passwordConfirm: {
			type: "password",
			label: "Password Confirm",
			required: true,
			value: "",
		},
	});

	const onFormSubmit = (e) => {
		e.preventDefault();
		const data = {
			name: formState.name.value,
			email: formState.email.value,
			passwordConfirm: formState.passwordConfirm.value,
			password: formState.password.value,
			location,
		};
		registerUser(data);

		Object.keys(formState).forEach((el) => {
			formState[el].value = "";
		});

		setLocation({ coordinates: [] });
		setallowLocation(false);
	};

	useEffect(() => {
		if (allowLocation) {
			navigator.geolocation.getCurrentPosition((res) => {
				setLocation({
					coordinates: [res.coords.longitude, res.coords.latitude],
				});
			});
		}
	}, [allowLocation]);

	useEffect(() => {
		if (registerUserError) {
			setShowAlert(true);
		}
	}, [registerUserError, formState]);

	return (
		<>
			{showAlert && registerUserError && (
				<Alert show={registerUserError} variant='danger'>
					{registerUserError.message}
				</Alert>
			)}
			<section className='auth-form register'>
				<form
					className='auth-form__form'
					autoComplete='off'
					onSubmit={onFormSubmit}>
					<div className='form__group'>
						<h2 className='heading-1 u-text-primary u-ftwt-400'>Register</h2>
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
						<label className='form__label'>
							Address (Give access to your location)
						</label>
						<ToggleSwitch
							active={allowLocation}
							onToggle={() => setallowLocation(!allowLocation)}
						/>
					</div>

					<div className='form__group'>
						<button className='btn btn__tertiary auth-form__cta' type='submit'>
							{registerUserInit ? "Loading..." : "Register"}
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		// sendEmailInit: state.auth.sendEmailInit,
		registerUserInit: state.auth.registerUserInit,
		registerUserError: state.auth.registerUserError,
		registerUserStatus: state.auth.registerUserStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		registerUser: (data) => dispatch(actionTypes.registerUser(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
