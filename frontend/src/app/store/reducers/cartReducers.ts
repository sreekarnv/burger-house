import * as actionTypes from '../actionTypes';

import { AnyAction } from 'redux';
import { Burger } from '~@types/burger';
import { Reducer } from 'react';

interface State {
	cart: Burger[];
	cartValue: number;
	cartPrice: number;
}

const initialState: State = {
	cart: [],
	cartValue: 0,
	cartPrice: 0,
};

// Add Burger to cart
const addBurgerToCart = (state: State, action: AnyAction) => {
	const cartArr = [...state.cart];

	// if burger already exists, increment itemsInCart else push it to array
	if (cartArr.find((burger) => burger.id === action.burger.id)) {
		const burgerIndex = cartArr.findIndex(
			(burger) => burger.id === action.burger.id
		);
		cartArr[burgerIndex].itemsInCart!++;
	} else {
		if (action.burger.name.startsWith('Custom')) {
			cartArr.push({ ...action.burger, itemsInCart: 1 });
		} else {
			cartArr.push({
				...action.burger,
				itemsInCart: 1,
				ingredients: undefined,
			});
		}
	}

	const cartPrice = state.cartPrice + action.burger.price;

	return {
		...state,
		cart: cartArr,
		cartValue: state.cartValue + 1,
		cartPrice,
	};
};

// Remove Burger from cart
const removeBurgerFromCart = (state: State, action: AnyAction) => {
	const cartArr = [...state.cart];

	// if burger already exists
	if (cartArr.find((burger) => burger.id === action.burger.id)) {
		const burgerIndex = cartArr.findIndex(
			(burger) => burger.id === action.burger.id
		);

		if (cartArr[burgerIndex].itemsInCart! > 1) {
			cartArr[burgerIndex].itemsInCart!--;
		} else {
			cartArr.splice(burgerIndex, 1);
		}
	}

	const cartPrice = state.cartPrice - action.burger.price;

	return {
		...state,
		cart: cartArr,
		cartValue: state.cartValue - 1,
		cartPrice,
	};
};

// Remove Burger from cart
const removeAllBurgerFromCart = (state: State, action: AnyAction) => {
	const cartArr = [...state.cart];

	// if burger already exists
	if (cartArr.find((burger) => burger.id === action.burger.id)) {
		const burgerIndex = cartArr.findIndex(
			(burger) => burger.id === action.burger.id
		);

		cartArr.splice(burgerIndex, 1);
	}

	const cartPrice =
		state.cartPrice - action.burger.price * action.burger.itemsInCart;

	const cartValue = state.cartValue - action.burger.itemsInCart;

	return {
		...state,
		cart: cartArr,
		cartValue,
		cartPrice,
	};
};

// clear cart

const clearCart = (state: State, action: AnyAction) => {
	return {
		...state,
		cart: [],
		cartValue: 0,
		cartPrice: 0,
	};
};

const reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case actionTypes.ADD_BURGER_TO_CART:
			return addBurgerToCart(state, action);
		case actionTypes.REMOVE_BURGER_FROM_CART:
			return removeBurgerFromCart(state, action);
		case actionTypes.REMOVE_ALL_ITEMS_BURGER_FROM_CART:
			return removeAllBurgerFromCart(state, action);
		case actionTypes.CLEAR_CART:
			return clearCart(state, action);
		default:
			return state;
	}
};

export default reducer;
