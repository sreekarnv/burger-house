import * as actionTypes from "./../actionTypes";

const initialState = {
	placeOrderInit: false,
	placeOrderError: null,
	placeOrderStatus: null,
	newOrder: null,
};

const placeOrderInit = (state, action) => {
	return {
		...state,
		placeOrderInit: true,
		placeOrderError: null,
	};
};

const placeOrderSuccess = (state, action) => {
	return {
		...state,
		placeOrderStatus: "success",
		placeOrderInit: false,
		newOrder: action.newOrder,
	};
};

const placeOrderFailed = (state, action) => {
	return {
		...state,
		placeOrderStatus: null,
		placeOrderInit: false,
		placeOrderError: action.error,
	};
};

const resetOrderStatus = (state, action) => {
	return {
		...state,
		placeOrderStatus: null,
		placeOrderInit: false,
		newOrder: null,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PLACE_ORDER_INIT:
			return placeOrderInit(state, action);
		case actionTypes.PLACE_ORDER_FAILED:
			return placeOrderFailed(state, action);
		case actionTypes.PLACE_ORDER_SUCCESS:
			return placeOrderSuccess(state, action);

		case actionTypes.RESET_ORDER_STATUS:
			return resetOrderStatus(state, action);
		default:
			return state;
	}
};

export default reducer;
