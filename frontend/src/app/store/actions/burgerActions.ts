import { Burger } from 'src/@types/burger';
import * as actionTypes from '../actionTypes';

/////////////////////////////////////////////////////////////////////
// Update no. of items field in cart

export const updateBurgerItemsInCart = (burger: Burger, cartAction: string) => {
	return {
		type: actionTypes.UPDATE_BURGER_ITEMS_IN_CART,
		burger,
		cartAction,
	};
};

export const getBurgers = (burgers: Burger[], cartBurgers: Burger[]) => {
	return {
		type: actionTypes.GET_BURGERS,
		burgers,
		cartBurgers,
	};
};

export const getNewBurgers = (burgers: Burger[]) => {
	return {
		type: actionTypes.GET_NEW_BURGERS,
		burgers,
	};
};
