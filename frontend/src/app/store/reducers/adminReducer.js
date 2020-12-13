import * as actionTypes from "./../actionTypes";

const initialState = {
	allOrders: [],
	allOrdersInit: false,
	allOrdersError: null,

	orderStats: null,
	orderStatsInit: false,
	orderStatsError: null,

	allUsers: [],
	allUserInit: false,
	allUsersError: null,
};

// Get all Orders

const getAllOrdersAdminInit = (state, action) => {
	return {
		...state,
		allOrdersInit: true,
		allOrdersError: null,
	};
};

const getAllOrdersAdminSuccess = (state, action) => {
	return {
		...state,
		allOrders: action.orders,
		allOrdersInit: false,
	};
};

const getAllOrdersAdminFailed = (state, action) => {
	return {
		...state,
		allOrdersInit: false,
		allOrdersError: action.error,
	};
};

// Order Admin Stats

const getAllOrdersAdminStatsInit = (state, action) => {
	return {
		...state,
		orderStatsInit: true,
		orderStatsError: null,
	};
};

const getAllOrdersAdminStatsSuccess = (state, action) => {
	return {
		...state,
		orderStats: action.orderStats,
		orderStatsInit: false,
	};
};

const getAllOrdersAdminStatsFailed = (state, action) => {
	return {
		...state,
		orderStatsInit: false,
		orderStatsError: action.error,
	};
};

/// All Users
const getAllUsersInit = (state, action) => {
	return {
		...state,
		allUsersInit: true,
		allUsersError: null,
	};
};

const getAllUsersSuccess = (state, action) => {
	return {
		...state,
		allUsers: action.users,
		allUsersInit: false,
	};
};

const getAllUsersFailed = (state, action) => {
	return {
		...state,
		allUsersInit: false,
		allUsersError: action.error,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_ORDERS_ADMIN_INIT:
			return getAllOrdersAdminInit(state, action);
		case actionTypes.GET_ALL_ORDERS_ADMIN_SUCCESS:
			return getAllOrdersAdminSuccess(state, action);
		case actionTypes.GET_ALL_ORDERS_ADMIN_FAILED:
			return getAllOrdersAdminFailed(state, action);

		case actionTypes.GET_ALL_ORDERS_ADMIN_STATS_INIT:
			return getAllOrdersAdminStatsInit(state, action);
		case actionTypes.GET_ALL_ORDERS_ADMIN_STATS_SUCCESS:
			return getAllOrdersAdminStatsSuccess(state, action);
		case actionTypes.GET_ALL_ORDERS_ADMIN_STATS_FAILED:
			return getAllOrdersAdminStatsFailed(state, action);

		case actionTypes.GET_ALL_USERS_INIT:
			return getAllUsersInit(state, action);
		case actionTypes.GET_ALL_USERS_SUCCESS:
			return getAllUsersSuccess(state, action);
		case actionTypes.GET_ALL_USERS_FAILED:
			return getAllUsersFailed(state, action);
		default:
			return state;
	}
};

export default reducer;
