import * as actionTypes from './actions';

import * as orderActions from './orders'


export const addBurgerToCart = (burgerObj) => {
    return {
        type: actionTypes.ADD_BURGERS_TO_CART,
        burgerObj,
    }
};

export const incrementItem = (burgerObj) => {

    return {
        type: actionTypes.INCREMENT_ITEM,
        burgerObj,
    }
}


export const decrementItem = (burgerObj) => {

    return {
        type: actionTypes.DECREMENT_ITEM,
        burgerObj,
    }
}


export const removeBurgerFromCart = (burgerObj) => {
    return {
        type: actionTypes.REMOVE_ALL_ITEMS,
        burgerObj,
    }
}

export const clearCartInit = () => {
    return dispatch => {
        dispatch(clearCart());
        dispatch(orderActions.clearCart());
    }
}


export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART
    }
}
