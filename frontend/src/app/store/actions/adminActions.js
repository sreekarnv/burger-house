import * as actionTypes from "./../actionTypes";

import {
	updateUserOrderInit,
	updateUserOrderSuccess,
	updateUserOrderFailed,
} from "./userActions";

import axios from "axios";

// Get All Orders
export const getAllOrdersAdminInit = () => {
	return {
		type: actionTypes.GET_ALL_ORDERS_ADMIN_INIT,
	};
};

export const getAllOrdersAdminSuccess = (orders) => {
	return {
		type: actionTypes.GET_ALL_ORDERS_ADMIN_SUCCESS,
		orders,
	};
};

export const getAllOrdersAdminFailed = (error) => {
	return {
		type: actionTypes.GET_ALL_ORDERS_ADMIN_FAILED,
		error,
	};
};

export const getAllOrdersAdmin = (filter) => {
	return async (dispatch) => {
		dispatch(getAllOrdersAdminInit());
		try {
			const res = await axios({
				method: "GET",
				url: "/api/v2/orders/admin",
				params: {
					...filter,
				},
			});

			dispatch(getAllOrdersAdminSuccess(res.data.data));
		} catch (err) {
			dispatch(getAllOrdersAdminFailed(err.response.data));
		}
	};
};

// All Orders Stats

export const getAllOrdersAdminStatsInit = () => {
	return {
		type: actionTypes.GET_ALL_ORDERS_ADMIN_STATS_INIT,
	};
};

export const getAllOrdersAdminStatsSuccess = (orderStats) => {
	return {
		type: actionTypes.GET_ALL_ORDERS_ADMIN_STATS_SUCCESS,
		orderStats,
	};
};

export const getAllOrdersAdminStatsFailed = (error) => {
	return {
		type: actionTypes.GET_ALL_ORDERS_ADMIN_STATS_FAILED,
		error,
	};
};

export const getAllOrdersStatsAdmin = (filter) => {
	return async (dispatch) => {
		dispatch(getAllOrdersAdminStatsInit());
		try {
			const res = await axios({
				method: "GET",
				url: "/api/v2/orders/admin/orderStats",
			});

			dispatch(getAllOrdersAdminStatsSuccess(res.data.orderStats));
		} catch (err) {
			dispatch(getAllOrdersAdminStatsFailed(err.response.data));
		}
	};
};

/////////////////////////////////////////////////////
// Update Order status

export const updateOrderStatusAdmin = (id, data) => {
	return async (dispatch) => {
		dispatch(updateUserOrderInit());
		try {
			const res = await axios({
				method: "PATCH",
				url: `/api/v2/orders/admin/${id}`,
				data,
			});

			dispatch(updateUserOrderSuccess(res.data.data));
		} catch (err) {
			dispatch(updateUserOrderFailed(err.response.data));
		}
	};
};

/////////////////////////////////////////////////////////////
// Get All Users

export const getAllUsersInit = () => {
	return {
		type: actionTypes.GET_ALL_USERS_INIT,
	};
};

export const getAllUsersSuccess = (users) => {
	return {
		type: actionTypes.GET_ALL_USERS_SUCCESS,
		users,
	};
};

export const getAllUsersFailed = (error) => {
	return {
		type: actionTypes.GET_ALL_USERS_FAILED,
		error,
	};
};

export const getAllUsers = () => {
	return async (dispatch) => {
		dispatch(getAllUsersInit());
		try {
			const res = await axios({
				method: "GET",
				url: "/api/v2/users",
			});

			dispatch(getAllUsersSuccess(res.data.data));
		} catch (err) {
			dispatch(getAllUsersFailed(err.response.data));
		}
	};
};

// Update User Role to Admin

export const updateUserRole = (id, data) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "PATCH",
				url: `/api/v2/users/${id}`,
				data,
			});
		} catch (err) {
			dispatch(getAllUsersFailed(err.response.data));
		}
	};
};

// Delete User

export const deleteUser = (id) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "DELETE",
				url: `/api/v2/users/${id}`,
			});
		} catch (err) {
			dispatch(getAllUsersFailed(err.response.data));
		}
	};
};
