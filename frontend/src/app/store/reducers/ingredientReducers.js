import * as actionTypes from "./../actionTypes";

const initialState = {
	ingredients: [],
	ingredientsInit: false,
	ingredientsError: null,
};

const getIngredientsInit = (state, action) => {
	return {
		...state,
		ingredientsInit: true,
		ingredientsError: null,
	};
};

const getIngredientsSuccess = (state, action) => {
	return {
		...state,
		ingredientsInit: false,
		ingredients: action.ingredients,
	};
};

const getIngredientsFailed = (state, action) => {
	return {
		...state,
		ingredientsInit: false,
		ingredientsError: action.error,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_INGREDIENTS_INIT:
			return getIngredientsInit(state, action);
		case actionTypes.GET_ALL_INGREDIENTS_SUCCESS:
			return getIngredientsSuccess(state, action);
		case actionTypes.GET_ALL_INGREDIENTS_FAILED:
			return getIngredientsFailed(state, action);

		default:
			return state;
	}
};

export default reducer;
