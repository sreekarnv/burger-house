import * as actionTypes from "../actionTypes";

const initialState = {
	burgers: [],
	getBurgersInit: false,
	getBurgersError: null,

	newBurgers: [],
	getNewBurgersInit: false,
	getNewBurgersError: null,
};

const getBurgersInit = (state, action) => {
	return {
		...state,
		getBurgersInit: true,
	};
};

const getBurgersSuccess = (state, action) => {
	// add itemsInCartField
	action.burgers.forEach((el) => (el["itemsInCart"] = 0));

	return {
		...state,
		getBurgersInit: false,
		burgers: action.burgers,
	};
};

const getBurgersFailed = (state, action) => {
	return {
		...state,
		getBurgersInit: false,
	};
};

///////////////////////////////////////////////////////////////
// new burgers

const getNewBurgersInit = (state, action) => {
	return {
		...state,
		getNewBurgersInit: true,
	};
};

const getNewBurgersSuccess = (state, action) => {
	// add itemsInCartField
	action.burgers.forEach((el) => (el["itemsInCart"] = 0));

	return {
		...state,
		getNewBurgersInit: false,
		newBurgers: action.burgers,
	};
};

const getNewBurgersFailed = (state, action) => {
	return {
		...state,
		getNewBurgersInit: false,
	};
};

////////////////////////////////////////////////////////////
// Updating itemsInCart field for burgers

const updateBurgerItemsInCart = (state, action) => {
	const burgersArr = [...state.burgers];
	const newBurgersArr = [...state.newBurgers];

	const burgerIndex = burgersArr.findIndex(
		(burger) => burger._id === action.burger._id
	);

	const newBurgerIndex = newBurgersArr.findIndex(
		(burger) => burger._id === action.burger._id
	);

	if (action.cartAction === "remove") {
		if (burgerIndex !== -1) burgersArr[burgerIndex].itemsInCart--;
		if (newBurgerIndex !== -1) newBurgersArr[newBurgerIndex].itemsInCart--;
	} else if (action.cartAction === "removeAll") {
		if (newBurgerIndex !== -1) newBurgersArr[newBurgerIndex].itemsInCart = 0;
		if (burgerIndex !== -1) burgersArr[burgerIndex].itemsInCart = 0;
	} else {
		if (burgerIndex !== -1) burgersArr[burgerIndex].itemsInCart++;
		if (newBurgerIndex !== -1) newBurgersArr[newBurgerIndex].itemsInCart++;
	}

	return {
		...state,
		burgers: burgersArr,
		newBurgers: newBurgersArr,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// Get new burgers
		case actionTypes.GET_NEW_BURGERS_INIT:
			return getNewBurgersInit(state, action);
		case actionTypes.GET_NEW_BURGERS_SUCCESS:
			return getNewBurgersSuccess(state, action);
		case actionTypes.GET_NEW_BURGERS_FAILED:
			return getNewBurgersFailed(state, action);

		// Get all burgers
		case actionTypes.GET_BURGERS_INIT:
			return getBurgersInit(state, action);
		case actionTypes.GET_BURGERS_SUCCESS:
			return getBurgersSuccess(state, action);
		case actionTypes.GET_BURGERS_FAILED:
			return getBurgersFailed(state, action);

		case actionTypes.UPDATE_BURGER_ITEMS_IN_CART:
			return updateBurgerItemsInCart(state, action);

		default:
			return state;
	}
};

export default reducer;
