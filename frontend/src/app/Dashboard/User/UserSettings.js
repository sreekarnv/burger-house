import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../../shared/components/Loader/Loader";

import Alert from "./../../shared/components/Alert/Alert";
import FormInput from "./../../shared/components/Form/FormInput";

import * as userActions from "./../../store/actions/userActions";

const UserSettings = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const userUpdateError = useSelector((state) => state.user.userUpdateError);
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [userPasswordError, setUserPasswordError] = useState();

	useEffect(() => {
		if (userUpdateError) {
			setShowAlert(true);
			let timer = setTimeout(() => {
				setShowAlert(false);
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [userUpdateError]);

	const [updateDetailsFormState, setUpdateDetailsFormState] = useState({
		email: {
			type: "email",
			label: "Email",
			required: true,
			value: user.email,
		},
		name: {
			type: "text",
			label: "Name",
			required: true,
			value: user.name,
		},
		photo: {
			type: "file",
			label: "photo",
			value: "",
			preview: user.photoUrl,
		},
	});

	const [updatePasswordFormState, setUpdatePasswordFormState] = useState({
		currentPassword: {
			type: "password",
			label: "Password Current",
			required: true,
			value: "",
		},
		password: {
			type: "password",
			label: "Password New",
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

	const updateDetailsHandler = async (e) => {
		e.preventDefault();
		let data = new FormData();

		if (user.name !== updateDetailsFormState.name.value) {
			data.append("name", updateDetailsFormState.name.value);
		}

		if (user.email !== updateDetailsFormState.email.value) {
			data.append("email", updateDetailsFormState.email.value);
		}

		if (updateDetailsFormState.photo.value !== "") {
			data.append("photo", updateDetailsFormState.photo.value);
		}

		dispatch(userActions.updateUserData(data));
	};

	const updatePasswordHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		let data = {
			currentPassword: updatePasswordFormState.currentPassword.value,
			password: updatePasswordFormState.password.value,
			passwordConfirm: updatePasswordFormState.passwordConfirm.value,
		};
		try {
			let res = await axios({
				method: "POST",
				url: "/api/v2/users/updateCurrentUserPassword",
				data,
			});

			if (res) {
				setLoading(false);
				return history.replace("/logout");
			}
		} catch (err) {
			setShowAlert(true);
			setUserPasswordError({ ...err.response.data });
		}
		setLoading(false);
	};

	if (loading) {
		return <Loader fullScreen />;
	}

	return (
		<>
			{showAlert && (userUpdateError || userPasswordError) && (
				<Alert variant='danger'>
					{userUpdateError && userUpdateError.message}
					{userPasswordError && userPasswordError.message}
				</Alert>
			)}
			<div className='user-settings'>
				<form
					onSubmit={updateDetailsHandler}
					autoComplete='off'
					className='user-settings__update-form user-settings__update-form--1'>
					<div className='form__group'>
						<h2 className='heading-2 u-text-primary u-ftwt-400'>
							Update User Details
						</h2>
					</div>

					{Object.keys(updateDetailsFormState).map((el) => {
						return (
							<FormInput
								formState={updateDetailsFormState}
								key={el}
								id={el}
								onFormStateChange={setUpdateDetailsFormState}
							/>
						);
					})}

					<div className='form__group'>
						<button className='btn btn__tertiary auth-form__cta' type='submit'>
							{"Update Details"}
						</button>
					</div>
				</form>

				<form
					onSubmit={updatePasswordHandler}
					autoComplete='off'
					className='user-settings__update-form user-settings__update-form--2'>
					<div className='form__group'>
						<h2 className='heading-2 u-text-primary u-ftwt-400'>
							Update User Password
						</h2>
					</div>

					{Object.keys(updatePasswordFormState).map((el) => {
						return (
							<FormInput
								formState={updatePasswordFormState}
								key={el}
								id={el}
								onFormStateChange={setUpdatePasswordFormState}
							/>
						);
					})}

					<div className='form__group'>
						<button className='btn btn__tertiary auth-form__cta' type='submit'>
							{"Update Password"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default UserSettings;
