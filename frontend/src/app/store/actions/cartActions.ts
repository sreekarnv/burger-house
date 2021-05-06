import * as actionTypes from '../actionTypes';

import { Burger } from '~@types/burger';
import { updateBurgerItemsInCart } from './burgerActions';

// increment itemsInCart
export const pushBurgerToCart = (burger: Burger) => {
	return {
		type: actionTypes.ADD_BURGER_TO_CART,
		burger,
	};
};

// decrement itemsInCart
export const popBurgerFromCart = (burger: Burger) => {
	return {
		type: actionTypes.REMOVE_BURGER_FROM_CART,
		burger,
	};
};

// remove a burger with itemInCart > 0
export const removeAllItemsOfBurgerFromCart = (burger: Burger) => {
	return {
		type: actionTypes.REMOVE_ALL_ITEMS_BURGER_FROM_CART,
		burger,
	};
};

export const addBurgerToCart = (burger: Burger) => {
	return (dispatch: any) => {
		dispatch(pushBurgerToCart(burger));
		dispatch(updateBurgerItemsInCart(burger, 'add'));
	};
};

export const removeBurgerFromCart = (burger: Burger) => {
	return (dispatch: any) => {
		dispatch(popBurgerFromCart(burger));
		dispatch(updateBurgerItemsInCart(burger, 'remove'));
	};
};

export const removeAllBurgersFromCart = (burger: Burger) => {
	return (dispatch: any) => {
		dispatch(removeAllItemsOfBurgerFromCart(burger));
		dispatch(updateBurgerItemsInCart(burger, 'removeAll'));
	};
};

export const clearCart = (cart: any) => {
	return (dispatch: any) => {
		cart.forEach((el: any) => {
			dispatch(removeAllBurgersFromCart(el));
		});

		dispatch({ type: actionTypes.CLEAR_CART });
	};
};
