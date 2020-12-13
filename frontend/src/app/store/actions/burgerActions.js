import axios from "axios";
import * as actionTypes from "./../actionTypes";

///////////////////////////////////////////////////////
// get newly added burgers

export const getBurgersNewInit = () => {
	return {
		type: actionTypes.GET_NEW_BURGERS_INIT,
	};
};

export const getNewBurgersSuccess = (burgers) => {
	return {
		type: actionTypes.GET_NEW_BURGERS_SUCCESS,
		burgers,
	};
};

export const getNewBurgersFailed = (error) => {
	return {
		type: actionTypes.GET_NEW_BURGERS_FAILED,
		error,
	};
};

export const getNewBurgers = () => {
	return async (dispatch) => {
		dispatch(getBurgersNewInit());

		try {
			const res = await axios({
				method: "GET",
				url: `/api/v2/burgers/get-new-burgers`,
			});

			dispatch(getNewBurgersSuccess(res.data.data));
		} catch (err) {
			dispatch(getNewBurgersFailed(err.response));
		}
	};
};

///////////////////////////////////////////////////////
// get all burgers

export const getBurgersInit = () => {
	return {
		type: actionTypes.GET_BURGERS_INIT,
	};
};

export const getBurgersSuccess = (burgers) => {
	return {
		type: actionTypes.GET_BURGERS_SUCCESS,
		burgers,
	};
};

export const getBurgersFailed = (error) => {
	return {
		type: actionTypes.GET_BURGERS_FAILED,
		error,
	};
};

export const getBurgers = (filter) => {
	return async (dispatch) => {
		dispatch(getBurgersInit());

		try {
			const res = await axios({
				method: "GET",
				url: `/api/v2/burgers`,
				params: {
					...filter,
				},
			});

			dispatch(getBurgersSuccess(res.data.data));
		} catch (err) {
			dispatch(getBurgersFailed(err.response));
		}
	};
};

/////////////////////////////////////////////////////////////////////
// Update no. of items field in cart

export const updateBurgerItemsInCart = (burger, cartAction) => {
	return {
		type: actionTypes.UPDATE_BURGER_ITEMS_IN_CART,
		burger,
		cartAction,
	};
};
