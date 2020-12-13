import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../shared/components/Form/FormInput";
import Loader from "../shared/components/Loader/Loader";

import * as authActions from "./../store/actions/authActions";

const SendEmailConfirmation = (props) => {
	const { sendEmailInit, sendEmailStatus, sendEmailConfirmation } = props;

	const [formState, setformState] = useState({
		email: {
			type: "email",
			label: "Email",
			required: true,
			value: "",
		},
	});

	if (sendEmailInit) {
		return <Loader fullScreen />;
	}

	const onSubmitEmail = (e) => {
		e.preventDefault();
		if (formState.email.value !== "") {
			sendEmailConfirmation(formState.email.value);
		}
	};

	return (
		<div className='send-email-confirm'>
			<form
				className='send-email-confirm__form'
				autoComplete='off'
				onSubmit={onSubmitEmail}>
				<div className='form__group'>
					<h2 className='heading-1 u-text-primary u-ftwt-400'>
						Resend Email Confirmation
					</h2>
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
				<button
					type='submit'
					className='send-email-confirm__btn btn btn__tertiary'>
					Send
				</button>
			</form>
			<br />

			{sendEmailStatus === "failed" && (
				<p className='send-email-confirm__error u-text-danger'>
					Something went wrong. Please try again later
				</p>
			)}

			{props.sendEmailStatus === "success" && (
				<p className='send-email-confirm__error u-text-success'>
					Email sent successfully! Please check your email.
				</p>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		sendEmailInit: state.auth.sendEmailInit,
		sendEmailStatus: state.auth.sendEmailStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendEmailConfirmation: (email) =>
			dispatch(authActions.sendEmailConfirmation(email)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SendEmailConfirmation);
