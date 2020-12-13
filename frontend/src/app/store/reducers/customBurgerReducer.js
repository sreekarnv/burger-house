import * as actionTypes from "./../actionTypes";

const initialState = {
	ingredients: [],
	burgerPrice: 250,
	displayIngredients: [],
};

const initCustomBurgerIngredients = (state, action) => {
	let ingredients = [...action.ingredients];
	let displayIngs = [];

	ingredients.forEach((el) => {
		if (!el.amount) el["amount"] = 0;

		if (el.amount !== 0) {
			for (let i = 1; i <= el.amount; i++) {
				displayIngs.push(el);
			}
		}
	});

	return {
		...state,
		ingredients: action.ingredients,
		displayIngredients: displayIngs,
	};
};

const addIngredient = (state, action) => {
	// updating state value
	const ingredients = [...state.ingredients];
	const ingredientIndex = ingredients.findIndex(
		(el) => el.name === action.ingredient.name
	);

	ingredients[ingredientIndex].amount++;
	const burgerPrice = state.burgerPrice + ingredients[ingredientIndex].price;

	// updating state display
	const displayIngredients = [...state.displayIngredients];
	displayIngredients.push({
		...action.ingredient,
		ingId: `${action.ingredient.name}-${Date.now()}`,
	});

	return {
		...state,
		ingredients,
		displayIngredients,
		burgerPrice,
	};
};

const removeIngredient = (state, action) => {
	// update state value
	const ingredients = [...state.ingredients];
	const ingredientIndex = ingredients.findIndex(
		(el) => el.name === action.ingredient.name
	);

	let burgerPrice = state.burgerPrice;
	if (ingredients[ingredientIndex].amount > 0) {
		burgerPrice -= ingredients[ingredientIndex].price;
		ingredients[ingredientIndex].amount--;
	}

	// update state display
	const displayIngredients = [...state.displayIngredients];
	const displayIngIndex = displayIngredients.findIndex(
		(el) => el._id === action.ingredient._id
	);

	if (displayIngIndex !== -1) {
		displayIngredients.splice(displayIngIndex, 1);
	}

	return {
		...state,
		ingredients,
		displayIngredients,
		burgerPrice,
	};
};

const resetIngredients = (state, action) => {
	const burgerPrice = 250;
	const displayIngredients = [];
	let ingredients = [...state.ingredients];
	ingredients.forEach((el) => (el.amount = 0));

	return {
		...state,
		burgerPrice,
		displayIngredients,
		ingredients,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INIT_CUSTOM_BURGER_INGREDIENTS:
			return initCustomBurgerIngredients(state, action);
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.RESET_INGREDIENTS:
			return resetIngredients(state, action);
		default:
			return state;
	}
};

export default reducer;
