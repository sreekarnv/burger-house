import * as actionTypes from './actions';
import axios from 'axios';


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        name: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        name: name
    };
};

export const clearIngredientValues = ingredients => {
    return {
        type: actionTypes.CLEAR_INGREDIENT_VALUES,
        ingredients: ingredients
    }
}

export const clearPriceValue = () => {
    return {
        type: actionTypes.CLEAR_TOTAL_PRICE,
    };
};

export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        ingredients,
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error
    }
}
export const initIngredients = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`/api/v1/ingredients`);
            console.log(response);
            dispatch(fetchIngredientsSuccess(response.data.ingredients));
        } catch (err) {
            dispatch(fetchIngredientsFailed({ ...err }.response.data));
        }
    }
};
