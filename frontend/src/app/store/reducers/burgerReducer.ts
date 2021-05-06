import * as actionTypes from '../actionTypes';

import { AnyAction } from 'redux';
import { Burger } from '~@types/burger';

interface State {
	burgers: Burger[];
	newBurgers: Burger[];
}

const initialState: State = {
	burgers: [],
	newBurgers: [],
};

const getBurgers = (state: State, action: AnyAction) => {
	// add itemsInCartField
	action.burgers.forEach((el: Burger) => {
		el.itemsInCart = 0;

		action.cartBurgers.forEach((el2: Burger) => {
			if (el._id === el2._id) {
				el.itemsInCart = el2.itemsInCart;
			}
		});
	});

	return {
		...state,
		burgers: action.burgers,
	};
};

///////////////////////////////////////////////////////////////
// add burgers

const getNewBurgers = (state: State, action: AnyAction) => {
	// add itemsInCartField

	action.burgers.forEach((el: Burger) => {
		el.itemsInCart = 0;
	});

	return {
		...state,
		getNewBurgersInit: false,
		newBurgers: action.burgers,
	};
};

////////////////////////////////////////////////////////////
// Updating itemsInCart field for burgers

const updateBurgerItemsInCart = (state: State, action: AnyAction) => {
	const burgersArr = [...state.burgers];
	const newBurgersArr = [...state.newBurgers];

	const burgerIndex = burgersArr.findIndex(
		(burger) => burger._id === action.burger._id
	);

	const newBurgerIndex = newBurgersArr.findIndex(
		(burger) => burger._id === action.burger._id
	);

	if (action.cartAction === 'remove') {
		if (burgerIndex !== -1) burgersArr[burgerIndex].itemsInCart!--;
		if (newBurgerIndex !== -1) newBurgersArr[newBurgerIndex].itemsInCart!--;
	} else if (action.cartAction === 'removeAll') {
		if (newBurgerIndex !== -1) newBurgersArr[newBurgerIndex].itemsInCart = 0;
		if (burgerIndex !== -1) burgersArr[burgerIndex].itemsInCart = 0;
	} else {
		if (burgerIndex !== -1) burgersArr[burgerIndex].itemsInCart!++;
		if (newBurgerIndex !== -1) newBurgersArr[newBurgerIndex].itemsInCart!++;
	}

	return {
		...state,
		burgers: burgersArr,
		newBurgers: newBurgersArr,
	};
};

const reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		// Get new burgers
		case actionTypes.GET_NEW_BURGERS:
			return getNewBurgers(state, action);

		// Get all burgers
		case actionTypes.GET_BURGERS:
			return getBurgers(state, action);

		case actionTypes.UPDATE_BURGER_ITEMS_IN_CART:
			return updateBurgerItemsInCart(state, action);

		default:
			return state;
	}
};

export default reducer;
