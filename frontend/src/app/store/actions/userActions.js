import axios from "axios";

import { loginUserSuccess } from "./authActions";
import * as actionTypes from "./../actionTypes";

//////////////////////////////////////////////////////////////

export const updateUserDataInit = () => {
	return {
		type: actionTypes.UPDATE_USER_DATA_INIT,
	};
};

export const updateUserDataSuccess = () => {
	return {
		type: actionTypes.UPDATE_USER_DATA_SUCCESS,
	};
};

export const updateUserDataFailed = (error) => {
	return {
		type: actionTypes.UPDATE_USER_DATA_FAILED,
		error,
	};
};

export const updateUserData = (data) => {
	return async (dispatch) => {
		dispatch(updateUserDataInit());
		try {
			const res = await axios({
				method: "PATCH",
				url: "/api/v2/users/me",
				data,
			});

			dispatch(updateUserDataSuccess());
			dispatch(loginUserSuccess(res.data.data));
		} catch (err) {
			dispatch(updateUserDataFailed(err.response.data));
		}
	};
};

/////////////////////////////////////////////////////////////////////

export const getUserOrdersInit = () => {
	return {
		type: actionTypes.GET_USER_ORDERS_INIT,
	};
};

export const getUserOrdersSuccess = (orders) => {
	return {
		type: actionTypes.GET_USER_ORDERS_SUCCESS,
		orders,
	};
};

export const getUserOrdersFailed = (error) => {
	return {
		type: actionTypes.GET_USER_ORDERS_FAILED,
		error,
	};
};

export const getUserOrders = () => {
	return async (dispatch) => {
		dispatch(getUserOrdersInit());
		try {
			const res = await axios({
				method: "GET",
				url: "/api/v2/users/me/orders",
			});

			dispatch(getUserOrdersSuccess(res.data.data));
		} catch (err) {
			dispatch(getUserOrdersFailed(err.response.data));
		}
	};
};

///////////////////////////////////////////////////////

export const getUserOrderInit = () => {
	return {
		type: actionTypes.GET_USER_ORDER_INIT,
	};
};

export const getUserOrderSuccess = (order) => {
	return {
		type: actionTypes.GET_USER_ORDER_SUCCESS,
		order,
	};
};

export const getUserOrderFailed = (error) => {
	return {
		type: actionTypes.GET_USER_ORDER_FAILED,
		error,
	};
};

export const getUserOrder = (id) => {
	return async (dispatch) => {
		dispatch(getUserOrderInit());
		try {
			const res = await axios({
				method: "GET",
				url: `/api/v2/users/me/orders/${id}`,
			});

			dispatch(getUserOrderSuccess(res.data.data));
		} catch (err) {
			dispatch(getUserOrderFailed(err.response.data));
		}
	};
};

/////////////////////////////////////////////////////////////
// Cancel User Order (UPDATE)

export const updateUserOrderInit = () => {
	return {
		type: actionTypes.UPDATE_USER_ORDER_INIT,
	};
};

export const updateUserOrderSuccess = (order) => {
	return {
		type: actionTypes.UPDATE_USER_ORDER_SUCCESS,
		order,
	};
};

export const updateUserOrderFailed = (error) => {
	return {
		type: actionTypes.UPDATE_USER_ORDER_FAILED,
		error,
	};
};

export const updateUserOrder = (id, status) => {
	return async (dispatch) => {
		dispatch(updateUserOrderInit());
		try {
			const res = await axios({
				method: "PATCH",
				url: `/api/v2/users/me/orders/${id}`,
				data: {
					status: status || "cancelled",
				},
			});

			dispatch(updateUserOrderSuccess(res.data.data));
		} catch (err) {
			dispatch(updateUserOrderFailed(err.response.data));
		}
	};
};
