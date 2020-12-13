import axios from "axios";
import * as actionTypes from "./../actionTypes";

///////////////////////////////////////////////////////

export const getIngredientsInit = () => {
	return {
		type: actionTypes.GET_ALL_INGREDIENTS_INIT,
	};
};

export const getIngredientsSuccess = (ingredients) => {
	return {
		type: actionTypes.GET_ALL_INGREDIENTS_SUCCESS,
		ingredients,
	};
};

export const getIngredientsFailed = (error) => {
	return {
		type: actionTypes.GET_ALL_INGREDIENTS_FAILED,
		error,
	};
};

export const getIngredients = (filter) => {
	return async (dispatch) => {
		dispatch(getIngredientsInit());
		try {
			const res = await axios({
				method: "GET",
				url: "/api/v2/ingredients",
				params: filter,
			});

			dispatch(getIngredientsSuccess(res.data.data));
		} catch (err) {
			dispatch(getIngredientsFailed());
		}
	};
};
