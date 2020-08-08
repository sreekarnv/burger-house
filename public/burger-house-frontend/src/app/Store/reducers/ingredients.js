import * as actionTypes from './../actions/actions';


const initialState = {
    ingredients: null,
    ingredient: null,

    getAllIngredientsStatus: null,
    getAllIngredientsInit: false,

    updateIngredientInit: false,
    updateIngredientStatus: null,

    getIngredientStatus: null,
    getIngredientInit: false,

    createIngredientsStatus: null,
    createIngredientsInit: false,

    deleteIngredientStatus: null,
    deleteIngredientInit: false,
}

// Get all Ingredients
//////////////////////////////////////////////////////////

const getAllIngredientsInit = (state, action) => {
    return {
        ...state,
        getAllIngredientsStatus: null,
        getAllIngredientsInit: true,
    }
}

const getAllIngredientsFailed = (state, action) => {
    return {
        ...state,
        getAllIngredientsStatus: action.error,
        getAllIngredientsInit: false,
    }
}


const getAllIngredientsSuccess = (state, action) => {
    let ingredients = [];
    (action.res.ingredients).map(el => {
        return ingredients.push({ ...el, photo: `/uploads/ingredients/${el.photo}` })
    })
    return {
        ...state,
        ingredients,
        getAllIngredientsStatus: action.res.status,
        getAllIngredientsInit: false,
    }
}
///////////////////////////////////////////////////////////////////////////////
// get ingredient

const getIngredientInit = (state, action) => {
    return {
        ...state,
        getIngredientStatus: null,
        getIngredientInit: true,
    }
}

const getIngredientFailed = (state, action) => {
    return {
        ...state,
        getIngredientStatus: action.error,
        getIngredientInit: false,
    }
}


const getIngredientSuccess = (state, action) => {

    return {
        ...state,
        ingredient: {
            ...action.res.ingredient,
            photo: `/uploads/ingredients/${action.res.ingredient.photo}`
        },
        getIngredientStatus: action.res.status,
        getIngredientInit: false,
    }
}




////////////////////////////////////////////////////////////////////////////////
// Create ingredient



const createIngredientsInit = (state, action) => {
    return {
        ...state,
        createIngredientsStatus: null,
        createIngredientsInit: true,
    }
}

const createIngredientsFailed = (state, action) => {
    return {
        ...state,
        createIngredientsStatus: action.error,
        createIngredientsInit: false,
    }
}


const createIngredientsSuccess = (state, action) => {
    return {
        ...state,
        createIngredientsStatus: action.res,
        createIngredientsInit: false,
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// Update ingredient


const updateIngredientInit = (state, action) => {
    return {
        ...state,
        updateIngredientsStatus: null,
        updateIngredientsInit: true,
    }
}

const updateIngredientFailed = (state, action) => {
    return {
        ...state,
        updateIngredientsStatus: action.error,
        updateIngredientsInit: false,
    }
}


const updateIngredientSuccess = (state, action) => {
    return {
        ...state,
        ingredient: {
            ...action.res.ingredient,
            photo: `/uploads/ingredients/${action.res.ingredient.photo}`
        },
        updateIngredientsStatus: action.res,
        updateIngredientsInit: false,
    }
}


/////////////////////////////////////////////////////////////////////////////////////

const deleteIngredientInit = (state, action) => {
    return {
        ...state,
        deleteIngredientStatus: null,
        deleteIngredientInit: true,
    }
}

const deleteIngredientFailed = (state, action) => {
    return {
        ...state,
        deleteIngredientStatus: action.error,
        deleteIngredientInit: false,
    }
}


const deleteIngredientSuccess = (state, action) => {
    return {
        ...state,
        deleteIngredientStatus: 'success',
        deleteIngredientInit: false,
    }
}
///////////////////////////////////////////////////////////////////////////////////

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_INGREDIENTS_INIT: return getAllIngredientsInit(state, action);
        case actionTypes.GET_INGREDIENTS_SUCCESS: return getAllIngredientsSuccess(state, action);
        case actionTypes.GET_INGREDIENTS_FAILED: return getAllIngredientsFailed(state, action);

        case actionTypes.CREATE_INGREDIENTS_INIT: return createIngredientsInit(state, action);
        case actionTypes.CREATE_INGREDIENTS_SUCCESS: return createIngredientsSuccess(state, action);
        case actionTypes.CREATE_INGREDIENTS_FAILED: return createIngredientsFailed(state, action);

        case actionTypes.GET_INGREDIENT_INIT: return getIngredientInit(state, action);
        case actionTypes.GET_INGREDIENT_SUCCESS: return getIngredientSuccess(state, action);
        case actionTypes.GET_INGREDIENT_FAILED: return getIngredientFailed(state, action);

        case actionTypes.UPDATE_INGREDIENT_INIT: return updateIngredientInit(state, action)
        case actionTypes.UPDATE_INGREDIENT_SUCCESS: return updateIngredientSuccess(state, action)
        case actionTypes.UPDATE_INGREDIENT_FAILED: return updateIngredientFailed(state, action)

        case actionTypes.DELETE_INGREDIENT_INIT: return deleteIngredientInit(state, action);
        case actionTypes.DELETE_INGREDIENT_SUCCESS: return deleteIngredientSuccess(state, action);
        case actionTypes.DELETE_ONE_USER_FAILED: return deleteIngredientFailed(state, action);

        default: return state;
    }
}

export default reducer;