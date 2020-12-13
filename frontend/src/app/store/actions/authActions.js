import axios from "axios";
import * as actionTypes from "./../actionTypes";

///////////////////////////////////////////////////////
// check for logged in user

export const checkAuthUserInit = () => {
	return {
		type: actionTypes.CHECK_AUTH_USER_INIT,
	};
};

export const checkAuthUserSuccess = (user) => {
	return {
		type: actionTypes.CHECK_AUTH_USER_SUCCESS,
		user,
	};
};

export const checkAuthUserFailed = (error) => {
	return {
		type: actionTypes.CHECK_AUTH_USER_FAILED,
		error,
	};
};

export const checkAuthUser = () => {
	return async (dispatch) => {
		dispatch(checkAuthUserInit());
		try {
			const res = await axios({
				method: "GET",
				url: "/api/v2/users/checkAuth",
			});

			dispatch(checkAuthUserSuccess(res.data.user));
		} catch (err) {
			dispatch(checkAuthUserFailed());
		}
	};
};

/////////////////////////////////////////////////////////
// register user

export const registerUserInit = () => {
	return {
		type: actionTypes.REGISTER_USER_INIT,
	};
};

export const registerUserSuccess = (user) => {
	return {
		type: actionTypes.REGISTER_USER_SUCCESS,
		user,
	};
};

export const registerUserFailed = (error) => {
	return {
		type: actionTypes.REGISTER_USER_FAILED,
		error,
	};
};

export const registerUser = (data) => {
	return async (dispatch) => {
		dispatch(registerUserInit());
		try {
			const res = await axios({
				method: "POST",
				url: "/api/v2/users/register",
				data,
			});

			dispatch(registerUserSuccess(res.data.user));
		} catch (err) {
			dispatch(registerUserFailed(err.response.data));
		}
	};
};

export const resetRegisterUserStatus = () => {
	return {
		type: actionTypes.RESET_REGISTER_USER_STATUS,
	};
};

///////////////////////////////////////////////////////
// Login user

export const loginUserInit = () => {
	return {
		type: actionTypes.LOGIN_USER_INIT,
	};
};

export const loginUserSuccess = (user) => {
	return {
		type: actionTypes.LOGIN_USER_SUCCESS,
		user,
	};
};

export const loginUserFailed = (error) => {
	return {
		type: actionTypes.LOGIN_USER_FAILED,
		error,
	};
};

export const loginUser = (data) => {
	return async (dispatch) => {
		dispatch(loginUserInit());
		try {
			const res = await axios({
				method: "POST",
				url: "/api/v2/users/login",
				data,
			});

			dispatch(loginUserSuccess(res.data.user));
		} catch (err) {
			dispatch(loginUserFailed(err.response.data));
		}
	};
};

/////////////////////////////////////////////////////
// logout user

export const logoutUserInit = () => {
	return {
		type: actionTypes.LOGOUT_USER_INIT,
	};
};

export const logoutUserSuccess = () => {
	return {
		type: actionTypes.LOGOUT_USER_SUCCESS,
	};
};

export const logoutUserFailed = (error) => {
	return {
		type: actionTypes.LOGOUT_USER_FAILED,
		error,
	};
};

export const logoutUser = () => {
	return async (dispatch) => {
		dispatch(logoutUserInit());
		try {
			await axios({
				method: "GET",
				url: "/api/v2/users/logout",
			});

			dispatch(logoutUserSuccess());
		} catch (err) {
			dispatch(logoutUserFailed(err.response.data));
		}
	};
};

///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// Send email confirmation

export const sendEmailConfirmationInit = () => {
	return {
		type: actionTypes.SEND_EMAIL_CONFIRMATION_INIT,
	};
};

export const sendEmailConfirmationSuccess = () => {
	return {
		type: actionTypes.SEND_EMAIL_CONFIRMATION_SUCCESS,
	};
};

export const sendEmailConfirmationFailed = () => {
	return {
		type: actionTypes.SEND_EMAIL_CONFIRMATION_FAILED,
	};
};

export const sendEmailConfirmation = (email) => {
	return async (dispatch) => {
		dispatch(sendEmailConfirmationInit());
		try {
			await axios({
				method: "POST",
				url: "/api/v2/users/sendUserVerification",
				data: {
					email,
				},
			});

			dispatch(sendEmailConfirmationSuccess());
		} catch (err) {
			dispatch(sendEmailConfirmationFailed());
		}
	};
};

////////////////////////////////////////////////////////////////
// verify account

export const verifyAccountInit = () => {
	return {
		type: actionTypes.VERIFY_ACCOUNT_INIT,
	};
};

export const verifyAccountSuccess = () => {
	return {
		type: actionTypes.VERIFY_ACCOUNT_SUCCESS,
	};
};

export const verifyAccountFailed = () => {
	return {
		type: actionTypes.VERIFY_ACCOUNT_FAILED,
	};
};

export const verifyAccount = (id) => {
	return async (dispatch) => {
		dispatch(verifyAccountInit());
		try {
			await axios({
				method: "GET",
				url: `/api/v2/users/verifyAccount/${id}`,
			});

			dispatch(verifyAccountSuccess());
		} catch (err) {
			dispatch(verifyAccountFailed());
		}
	};
};
