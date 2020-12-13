import * as actionTypes from "./../actionTypes";

import { updateBurgerItemsInCart } from "./burgerActions";

// increment itemsInCart
export const pushBurgerToCart = (burger) => {
	return {
		type: actionTypes.ADD_BURGER_TO_CART,
		burger,
	};
};

// decrement itemsInCart
export const popBurgerFromCart = (burger) => {
	return {
		type: actionTypes.REMOVE_BURGER_FROM_CART,
		burger,
	};
};

// remove a burger with itemInCart > 0
export const removeAllItemsOfBurgerFromCart = (burger) => {
	return {
		type: actionTypes.REMOVE_ALL_ITEMS_BURGER_FROM_CART,
		burger,
	};
};

export const addBurgerToCart = (burger) => {
	return (dispatch) => {
		dispatch(pushBurgerToCart(burger));
		dispatch(updateBurgerItemsInCart(burger, "add"));
	};
};

export const removeBurgerFromCart = (burger) => {
	return (dispatch) => {
		dispatch(popBurgerFromCart(burger));
		dispatch(updateBurgerItemsInCart(burger, "remove"));
	};
};

export const removeAllBurgersFromCart = (burger) => {
	return (dispatch) => {
		dispatch(removeAllItemsOfBurgerFromCart(burger));
		dispatch(updateBurgerItemsInCart(burger, "removeAll"));
	};
};

export const clearCart = (cart) => {
	return (dispatch) => {
		cart.forEach((el) => {
			dispatch(removeAllBurgersFromCart(el));
		});

		dispatch({ type: actionTypes.CLEAR_CART });
	};
};
