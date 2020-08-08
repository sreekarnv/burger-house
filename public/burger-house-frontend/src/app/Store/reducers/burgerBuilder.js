import * as actionTypes from '../actions/actions';

const TOTAL_PRICE = 280;


const initialState = {
    ingredientsLoading: false,
    ingredients: null,
    totalPrice: TOTAL_PRICE,
    error: false,
};

const fetchIngredientsSuccess = (state, action) => {
    let ings = {};

    action.ingredients.map(el => {
        return ings[el.name] = { ...el, value: 0, photo: `/uploads/ingredients/${el.photo}` }
    });
    return {
        ...state,
        ingredients: ings,
        error: false,
    }
};

const fetchIngredientsFailed = (state, action) => {
    return {
        ...state,
        error: action.error,
    }
};


const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.name]: {
                ...state.ingredients[action.name],
                value: state.ingredients[action.name].value + 1
            }
        },
        totalPrice: state.totalPrice + state.ingredients[action.name].price,
    };
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.name]: {
                ...state.ingredients[action.name],
                value: state.ingredients[action.name].value - 1
            }
        },
        totalPrice: state.totalPrice - state.ingredients[action.name].price,
    };
};

const clearIngredientValues = (state, action) => {
    let ings = { ...state.ingredients };
    Object.keys(ings).map(el => {
        ings[el].value = 0
        return ings[el].value;
    });
    return {
        ...state,
        ...state.ingredients,
        ingredients: ings
    };
};

const cleartotalPrice = (state, action) => {
    return {
        ...state,
        totalPrice: TOTAL_PRICE,
    };
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS_SUCCESS: return fetchIngredientsSuccess(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.CLEAR_INGREDIENT_VALUES: return clearIngredientValues(state, action);
        case actionTypes.CLEAR_TOTAL_PRICE: return cleartotalPrice(state, action);
        default: return state;
    };

};


export default reducer;


