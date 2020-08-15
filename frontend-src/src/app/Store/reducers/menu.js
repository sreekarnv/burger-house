import * as actionTypes from '../actions/actions';


const initialState = {
    Burgers: [],
    updateBurgers: [],

    ingredientsInit: false,
    ingredients: {},

    error: null,
    loading: false,

    menuIngs: {},
    totalBurgerPrice: 0,

    updateBurgersStatus: null,

    createBurgerInit: false,
    createBurgerStatus: null,

    deleteBurgerInit: false,
    deleteBurgerStatus: null,
}

/////////////////////////////////////////////////////////////////////
const fetchBurgersSuccess = (state, action) => {
    let burgers = [];

    action.burgers.map((el, i) => {
        let x = {
            ...action.burgers[i],
            totalPrice: 0,
            items: 0,
            photo: `/uploads/burgers/${action.burgers[i].photo}`
        }
        burgers.push(x);
        return burgers;
    })

    return {
        ...state,
        Burgers: burgers,
        loading: false,
        error: null,
    }
};

const fetchBurgersFailed = (state, action) => {
    let message, status;
    if (action.error.status) {
        message = action.error.data.message;
        status = action.error.status
    } else {
        message = action.error.message;
    }

    return {
        ...state,
        error: {
            message,
            status
        },
        loading: false,
    }
}

const fetchBurgersInit = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
    }
}
////////////////////////////////////////////////////////////////////////////


const fetchIngredientsInit = (state, action) => {
    return {
        ...state,
        ingredientsInit: true,
        error: null,
    }
}

const fetchIngredientsSuccess = (state, action) => {
    let ings = {};

    action.ingredients.map(el => {
        return ings[el.name] = { ...el, value: 0, photo: `/uploads/ingredients/${el.photo}` }
    });

    return {
        ...state,
        ingredients: ings,
        ingredientsInit: false,
    }
}

const fetchIngredientsFailed = (state, action) => {
    return {
        ...state,
        ingredients: action.error,
        ingredientsInit: false,
    }
}

////////////////////////////////////////////////////////////////////////////

const addIngredient = (state, action) => {
    return {
        ...state,
        menuIngs: {
            ...state.menuIngs,
            [action.name]: {
                ...state.menuIngs[action.name],
                value: state.menuIngs[action.name].value + 1
            }
        },
    };
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        menuIngs: {
            ...state.menuIngs,
            [action.name]: {
                ...state.menuIngs[action.name],
                value: state.menuIngs[action.name].value - 1
            }
        },
    };
};

///////////////////////////////////////////////////////////////////////////

const setMenuIngredients = (state, action) => {
    return {
        ...state,
        menuIngs: action.ings,
        loading: false
    }
}
////////////////////////////////////////////////////////////////

const updateMenuBurgerSuccess = (state, action) => {
    return {
        ...state,
        updateBurgersStatus: action.status,
        loading: false,
    }
}

const updateMenuBurgerFailed = (state, action) => {
    return {
        ...state,
        updateBurgersStatus: action.error,
        loading: false,
    }
}
///////////////////////////////////////////////////////////

const createBurgerInit = (state, action) => {
    return {
        ...state,
        createBurgerInit: true,
        createBurgerStatus: null,
    }
}

const createBurgerSuccess = (state, action) => {
    return {
        ...state,
        createBurgerInit: false,
        createBurgerStatus: action.status,
    }
}


const createBurgerFailed = (state, action) => {
    return {
        ...state,
        createBurgerInit: false,
        createBurgerStatus: action.error
    }
}
/////////////////////////////////////////////////////////////////////////////
// 

const deleteBurgerInit = (state, action) => {
    return {
        ...state,
        deleteBurgerInit: true,
        deleteBurgerStatus: null
    }
}


const deleteBurgerFailed = (state, action) => {
    return {
        ...state,
        deleteBurgerInit: false,
        deleteBurgerStatus: action.error
    }
}

const deleteBurgerSuccess = (state, action) => {
    return {
        ...state,
        deleteBurgerInit: false,
        deleteBurgerStatus: 'success'
    }
}

//////////////////////////////////////////////////////////////////////

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BURGERS_SUCCESS: return fetchBurgersSuccess(state, action);
        case actionTypes.FETCH_BURGERS_FAILED: return fetchBurgersFailed(state, action);
        case actionTypes.FETCH_BURGERS_INIT: return fetchBurgersInit(state, action);

        case actionTypes.FETCH_INGREDIENTS_INIT: return fetchIngredientsInit(state, action);
        case actionTypes.FETCH_INGREDIENTS_SUCCESS: return fetchIngredientsSuccess(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);

        case actionTypes.UPDATE_MENU_ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.UPDATE_MENU_REMOVE_INGREDIENT: return removeIngredient(state, action);

        case actionTypes.SET_MENU_INGREDIENTS: return setMenuIngredients(state, action);

        case actionTypes.UPDATE_BURGER_SUCCESS: return updateMenuBurgerSuccess(state, action);
        case actionTypes.UPDATE_BURGER_FAILED: return updateMenuBurgerFailed(state, action);

        case actionTypes.CREATE_BURGER_INIT: return createBurgerInit(state, action);
        case actionTypes.CREATE_BURGER_SUCCESS: return createBurgerSuccess(state, action);
        case actionTypes.CREATE_BURGER_FAILED: return createBurgerFailed(state, action);


        case actionTypes.DELETE_BURGER_INIT: return deleteBurgerInit(state, action);
        case actionTypes.DELETE_BURGER_SUCCESS: return deleteBurgerSuccess(state, action);
        case actionTypes.DELETE_BURGER_FAILED: return deleteBurgerFailed(state, action);
        default: return state;
    }
}

export default reducer;