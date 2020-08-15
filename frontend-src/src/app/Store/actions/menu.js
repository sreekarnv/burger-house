import * as actionTypes from './actions';
import axios from 'axios';
import { initIngredients } from './burgerBuilder';


export const fetchBurgersSuccess = burgers => {
    return {
        type: actionTypes.FETCH_BURGERS_SUCCESS,
        burgers
    };
};

export const fetchBurgersFailed = (err) => {
    return {
        type: actionTypes.FETCH_BURGERS_FAILED,
        error: err
    }
}

export const fetchBurgersInit = () => {
    return {
        type: actionTypes.FETCH_BURGERS_INIT
    }
}
////////////////////////////////////////////////////////////////


export const fetchIngredientsInit = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_INIT
    }
}

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

export const fetchIngredients = () => {
    return async dispatch => {
        dispatch(fetchIngredientsInit())
        try {
            const response = await axios.get(`/api/v1/ingredients`);
            dispatch(fetchIngredientsSuccess(response.data.ingredients));
        } catch (err) {
            dispatch(fetchIngredientsFailed({ ...err }.response.data));
        }
    }
};


///////////////////////////////////////////////////////////////
export const initBurgers = () => {
    return async dispatch => {
        dispatch(fetchBurgersInit());
        try {
            const response = await axios.get(`/api/v1/burgers`);
            const burgers = response.data.burgers
            dispatch(fetchBurgersSuccess(burgers));
        } catch (err) {
            const error = { ...err }.response ? { ...err }.response : err;
            dispatch(fetchBurgersFailed(error));
        }
    }
};


/////////////////////////////////////////////////////////////

export const addIngredient = (name) => {
    return {
        type: actionTypes.UPDATE_MENU_ADD_INGREDIENT,
        name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.UPDATE_MENU_REMOVE_INGREDIENT,
        name
    };
};

///////////////////////////////////////////////////////////////

export const setMenuIngs = (ings) => {
    return {
        type: actionTypes.SET_MENU_INGREDIENTS,
        ings
    }
}
///////////////////////////////////////////////////////////////

export const updateBurgerFailed = (error) => {
    return {
        type: actionTypes.UPDATE_BURGER_FAILED,
        error,
    }
}

export const updateBurgerSuccess = response => {
    return {
        type: actionTypes.UPDATE_BURGER_SUCCESS,
        status: response
    }
}

export const updateBurger = (burger) => {
    return async dispatch => {
        let id = burger._id ? burger._id : burger.get('_id');
        try {
            const res = await axios({
                url: `/api/v1/burgers/${id}`,
                data: burger,
                method: 'PATCH'
            })

            dispatch(updateBurgerSuccess(res.data))
            dispatch(initBurgers());
            dispatch(initIngredients());
        } catch (err) {
            dispatch(updateBurgerFailed({ ...err.response.data }))
        }
    }
}

////////////////////////////////////////////////////////////////////


export const createBurgerFailed = (error) => {
    return {
        type: actionTypes.CREATE_BURGER_FAILED,
        error,
    }
}

export const createBurgerSuccess = response => {
    return {
        type: actionTypes.CREATE_BURGER_SUCCESS,
        status: response
    }
}

export const createBurger = (burger) => {
    return async dispatch => {
        try {
            const res = await axios({
                url: `/api/v1/burgers`,
                data: burger,
                method: 'POST'
            })
            dispatch(createBurgerSuccess(res.data))
        } catch (err) {
            dispatch(createBurgerFailed({ ...err.response.data }))
        }
    }
}
////////////////////////////////////////////////////////////////////

export const deleteBurgerInit = () => {
    return {
        type: actionTypes.DELETE_BURGER_INIT
    }
}


export const deleteBurgerFailed = (error) => {
    return {
        type: actionTypes.DELETE_BURGER_FAILED,
        error,
    }
}

export const deleteBurgerSuccess = response => {
    return {
        type: actionTypes.DELETE_BURGER_SUCCESS,
        response
    }
}

export const deleteBurger = (id) => {
    return async dispatch => {
        try {
            dispatch(deleteBurgerInit());

            const res = await axios({
                url: `/api/v1/burgers/${id}`,
                method: 'delete'
            })
            dispatch(deleteBurgerSuccess(res.data))
        } catch (err) {
            dispatch(deleteBurgerFailed({ ...err.response.data }))
        }
    }
}

/////////////////////////////////////////////////////////////////