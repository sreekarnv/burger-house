import { Ingredient } from 'src/@types/ingredient';
import * as actionTypes from '../actionTypes';

export const initCustomBurgerIngredients = (ingredients: Ingredient[]) => {
	return {
		type: actionTypes.INIT_CUSTOM_BURGER_INGREDIENTS,
		ingredients,
	};
};

// add Ingredient
export const addIngredient = (ingredient: Ingredient) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredient,
	};
};

export const removeIngredient = (ingredient: Ingredient) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredient,
	};
};

export const resetIngredients = () => {
	return {
		type: actionTypes.RESET_INGREDIENTS,
	};
};
