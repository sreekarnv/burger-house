import * as actionTypes from "./../actionTypes";

const initialState = {
	user: null,
	checkAuthUserInit: false,

	loginUserInit: false,
	loginUserError: null,

	registerUserInit: false,
	registerUserStatus: null,
	registerUserError: null,

	logoutUserInit: false,
	logoutUserError: null,

	sendEmailInit: false,
	sendEmailStatus: null,

	accountVerifiedInit: false,
	accountVerifiedStatus: null,
};

/////////////////////////////////////////////////
// check for logged in user

const checkAuthUserInit = (state, action) => {
	return {
		...state,
		checkAuthUserInit: true,
	};
};

const checkAuthUserSuccess = (state, action) => {
	return {
		...state,
		checkAuthUserInit: false,
		user: action.user,
	};
};

const checkAuthUserFailed = (state, action) => {
	return {
		...state,
		checkAuthUserInit: false,
		user: null,
	};
};

/////////////////////////////////////////////////////////////
// register user

const registerUserInit = (state, action) => {
	return {
		...state,
		registerUserInit: true,
		registerUserError: null,
	};
};

const registerUserSuccess = (state, action) => {
	return {
		...state,
		registerUserInit: false,
		registerUserStatus: "success",
	};
};

const registerUserFailed = (state, action) => {
	return {
		...state,
		registerUserInit: false,
		registerUserError: action.error,
	};
};

const resetRegisterUserStatus = (state, action) => {
	return {
		...state,
		registerUserStatus: null,
	};
};

/////////////////////////////////////////////////
// login user

const loginUserInit = (state, action) => {
	return {
		...state,
		loginUserInit: true,
		loginUserError: null,
	};
};

const loginUserSuccess = (state, action) => {
	return {
		...state,
		loginUserInit: false,
		user: action.user,
	};
};

const loginUserFailed = (state, action) => {
	return {
		...state,
		loginUserInit: false,
		loginUserError: action.error,
	};
};

/////////////////////////////////////////////////
// logout user

const logoutUserInit = (state, action) => {
	return {
		...state,
		logoutUserInit: true,
		logoutUserError: null,
	};
};

const logoutUserSuccess = (state, action) => {
	return {
		...state,
		logoutUserInit: false,
		user: null,
	};
};

const logoutUserFailed = (state, action) => {
	return {
		...state,
		logoutUserInit: false,
		logoutUserError: action.error,
	};
};

////////////////////////////////////////////////////////////////////////////////////

const sendEmailConfirmationInit = (state, action) => {
	return {
		...state,
		sendEmailInit: true,
		sendEmailStatus: null,
	};
};

const sendEmailConfirmationSuccess = (state, action) => {
	return {
		...state,
		sendEmailInit: false,
		sendEmailStatus: "success",
	};
};

const sendEmailConfirmationFailed = (state, action) => {
	return {
		...state,
		sendEmailInit: false,
		sendEmailStatus: "failed",
	};
};

////////////////////////////////////////////////////////////////////////////////////

const accountVerifiedInit = (state, action) => {
	return {
		...state,
		accountVerifiedInit: true,
		accountVerifiedStatus: null,
	};
};

const accountVerifiedSuccess = (state, action) => {
	return {
		...state,
		accountVerifiedInit: false,
		accountVerifiedStatus: "success",
	};
};

const accountVerifiedFailed = (state, action) => {
	return {
		...state,
		accountVerifiedInit: false,
		accountVerifiedStatus: "failed",
	};
};

////////////////////////////////////////////////////////////
// reducer

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CHECK_AUTH_USER_INIT:
			return checkAuthUserInit(state, action);
		case actionTypes.CHECK_AUTH_USER_SUCCESS:
			return checkAuthUserSuccess(state, action);
		case actionTypes.CHECK_AUTH_USER_FAILED:
			return checkAuthUserFailed(state, action);

		case actionTypes.REGISTER_USER_INIT:
			return registerUserInit(state, action);
		case actionTypes.REGISTER_USER_SUCCESS:
			return registerUserSuccess(state, action);
		case actionTypes.REGISTER_USER_FAILED:
			return registerUserFailed(state, action);
		case actionTypes.RESET_REGISTER_USER_STATUS:
			return resetRegisterUserStatus(state, action);

		case actionTypes.LOGIN_USER_INIT:
			return loginUserInit(state, action);
		case actionTypes.LOGIN_USER_SUCCESS:
			return loginUserSuccess(state, action);
		case actionTypes.LOGIN_USER_FAILED:
			return loginUserFailed(state, action);

		case actionTypes.LOGOUT_USER_INIT:
			return logoutUserInit(state, action);
		case actionTypes.LOGOUT_USER_SUCCESS:
			return logoutUserSuccess(state, action);
		case actionTypes.LOGOUT_USER_FAILED:
			return logoutUserFailed(state, action);

		case actionTypes.SEND_EMAIL_CONFIRMATION_INIT:
			return sendEmailConfirmationInit(state, action);
		case actionTypes.SEND_EMAIL_CONFIRMATION_SUCCESS:
			return sendEmailConfirmationSuccess(state, action);
		case actionTypes.SEND_EMAIL_CONFIRMATION_FAILED:
			return sendEmailConfirmationFailed(state, action);

		case actionTypes.VERIFY_ACCOUNT_INIT:
			return accountVerifiedInit(state, action);
		case actionTypes.VERIFY_ACCOUNT_SUCCESS:
			return accountVerifiedSuccess(state, action);
		case actionTypes.VERIFY_ACCOUNT_FAILED:
			return accountVerifiedFailed(state, action);

		default:
			return state;
	}
};

export default reducer;
