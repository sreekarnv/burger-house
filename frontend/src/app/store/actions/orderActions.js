import axios from "axios";
import * as actionTypes from "./../actionTypes";

///////////////////////////////////////////////////////

export const placeOrderInit = () => {
	return {
		type: actionTypes.PLACE_ORDER_INIT,
	};
};

export const placeOrderSuccess = (order) => {
	return {
		type: actionTypes.PLACE_ORDER_SUCCESS,
		newOrder: order,
	};
};

export const placeOrderFailed = (error) => {
	return {
		type: actionTypes.PLACE_ORDER_FAILED,
		error,
	};
};

export const placeOrder = (data) => {
	return async (dispatch) => {
		dispatch(placeOrderInit());
		try {
			const res = await axios({
				method: "POST",
				url: "/api/v2/orders",
				data,
			});

			dispatch(placeOrderSuccess(res.data.data));
		} catch (err) {
			dispatch(placeOrderFailed());
		}
	};
};

export const resetOrderStatus = () => {
	return {
		type: actionTypes.RESET_ORDER_STATUS,
	};
};
