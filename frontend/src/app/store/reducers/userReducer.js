import * as actionTypes from "./../actionTypes";

const intitalState = {
	userUpdateDetailsInit: false,
	userUpdateError: null,

	userOrdersInit: false,
	userOrdersError: null,
	userOrders: [],

	userOrderInit: false,
	userOrderError: null,
	userOrder: null,
};

const updateUserDataInit = (state, action) => {
	return {
		...state,
		userUpdateDetailsInit: true,
		userUpdateError: null,
	};
};

const updateUserDataFailed = (state, action) => {
	return {
		...state,
		userUpdateDetailsInit: false,
		userUpdateError: action.error,
	};
};

const updateUserDataSuccess = (state, action) => {
	return {
		...state,
		userUpdateDetailsInit: false,
	};
};

//////////////////////////////////////////////////////////

const getUserOrdersInit = (state, action) => {
	return {
		...state,
		userOrdersInit: true,
		userOrdersError: null,
	};
};

const getUserOrdersFailed = (state, action) => {
	return {
		...state,
		userOrdersInit: false,
		userOrdersError: action.error,
	};
};

const getUserOrdersSuccess = (state, action) => {
	return {
		...state,
		userOrdersInit: false,
		userOrders: action.orders,
	};
};

//////////////////////////////////////////////////////////

const getUserOrderInit = (state, action) => {
	return {
		...state,
		userOrderInit: true,
		userOrderError: null,
	};
};

const getUserOrderFailed = (state, action) => {
	return {
		...state,
		userOrderInit: false,
		userOrderError: action.error,
	};
};

const getUserOrderSuccess = (state, action) => {
	return {
		...state,
		userOrderInit: false,
		userOrder: action.order,
	};
};

const reducer = (state = intitalState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_USER_DATA_INIT:
			return updateUserDataInit(state, action);
		case actionTypes.UPDATE_USER_DATA_SUCCESS:
			return updateUserDataSuccess(state, action);
		case actionTypes.UPDATE_USER_DATA_FAILED:
			return updateUserDataFailed(state, action);

		case actionTypes.GET_USER_ORDERS_INIT:
			return getUserOrdersInit(state, action);
		case actionTypes.GET_USER_ORDERS_SUCCESS:
			return getUserOrdersSuccess(state, action);
		case actionTypes.GET_USER_ORDERS_FAILED:
			return getUserOrdersFailed(state, action);

		case actionTypes.GET_USER_ORDER_INIT:
			return getUserOrderInit(state, action);
		case actionTypes.GET_USER_ORDER_SUCCESS:
			return getUserOrderSuccess(state, action);
		case actionTypes.GET_USER_ORDER_FAILED:
			return getUserOrderFailed(state, action);

		case actionTypes.UPDATE_USER_ORDER_INIT:
			return getUserOrdersInit(state, action);
		case actionTypes.UPDATE_USER_ORDER_SUCCESS:
			return getUserOrderSuccess(state, action);
		case actionTypes.UPDATE_USER_ORDER_FAILED:
			return getUserOrdersFailed(state, action);
		default:
			return state;
	}
};

export default reducer;
