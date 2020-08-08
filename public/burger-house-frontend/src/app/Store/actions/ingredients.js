import * as actionTypes from './actions';
import axios from 'axios';


export const getIngredientsInit = () => {
    return {
        type: actionTypes.GET_INGREDIENTS_INIT
    }
}

export const getIngredientsSuccess = data => {
    return {
        type: actionTypes.GET_INGREDIENTS_SUCCESS,
        res: data
    }
}

export const getIngredientsFailed = error => {
    return {
        type: actionTypes.GET_INGREDIENTS_FAILED,
        error
    }
}

export const getIngredients = () => {
    return async dispatch => {
        try {
            const res = await axios({
                method: 'get',
                url: `/api/v1/ingredients`
            })


            dispatch(getIngredientsSuccess(res.data))

        } catch (err) {
            dispatch(getIngredientsFailed(err.response.data))
        }
    }
}

///////////////////////////////////////////////////////////
// CREATE INGREDIENTS

export const createIngredientInit = () => {
    return {
        type: actionTypes.CREATE_INGREDIENTS_INIT
    }
}

export const createIngredientSuccess = data => {
    return {
        type: actionTypes.CREATE_INGREDIENTS_SUCCESS,
        res: data
    }
}

export const createIngredientFailed = error => {
    return {
        type: actionTypes.CREATE_INGREDIENTS_FAILED,
        error
    }
}

export const createIngredient = (data) => {
    return async dispatch => {
        dispatch(createIngredientInit());
        try {
            const res = await axios({
                method: 'POST',
                url: `/api/v1/ingredients`,
                data
            })


            dispatch(createIngredientSuccess(res.data))

        } catch (err) {
            dispatch(createIngredientFailed(err.response.data))
        }
    }
}

///////////////////////////////////////////////////////////////////////
// get Ingredient


export const getIngredientInit = () => {
    return {
        type: actionTypes.GET_INGREDIENT_INIT
    }
}

export const getIngredientSuccess = data => {
    return {
        type: actionTypes.GET_INGREDIENT_SUCCESS,
        res: data
    }
}

export const getIngredientFailed = error => {
    return {
        type: actionTypes.GET_INGREDIENT_FAILED,
        error
    }
}

export const getIngredient = (id) => {
    return async dispatch => {
        try {
            const res = await axios({
                method: 'get',
                url: `${URL}/api/v1/ingredients/${id}`
            })

            dispatch(getIngredientSuccess(res.data))

        } catch (err) {
            dispatch(getIngredientFailed(err.response.data))
        }
    }
}


//////////////////////////////////////////////////////////////////////
// UPDATE INGREDIENTS


export const updateIngredientInit = () => {
    return {
        type: actionTypes.UPDATE_INGREDIENT_INIT
    }
}

export const updateIngredientSuccess = data => {
    return {
        type: actionTypes.UPDATE_INGREDIENT_SUCCESS,
        res: data
    }
}

export const updateIngredientFailed = error => {
    return {
        type: actionTypes.UPDATE_INGREDIENT_FAILED,
        error
    }
}

export const updateIngredient = (data, id) => {
    return async dispatch => {
        dispatch(updateIngredientInit());
        try {
            const res = await axios({
                method: 'PATCH',
                url: `${URL}/api/v1/ingredients/${id}`,
                data
            })

            dispatch(updateIngredientSuccess(res.data))

        } catch (err) {
            dispatch(updateIngredientFailed(err.response.data))
        }
    }
}

/////////////////////////////////////////////////////////////////////////////
// DELETE ingredient

export const deleteIngredientInit = () => {
    return {
        type: actionTypes.DELETE_INGREDIENT_INIT
    }
}

export const deleteIngredientSuccess = data => {
    return {
        type: actionTypes.DELETE_INGREDIENT_SUCCESS,
        res: data
    }
}

export const deleteIngredientFailed = error => {
    return {
        type: actionTypes.DELETE_INGREDIENT_FAILED,
        error
    }
}

export const deleteIngredient = (id) => {
    return async dispatch => {
        dispatch(deleteIngredientInit());
        try {
            const res = await axios({
                method: 'DELETE',
                url: `${URL}/api/v1/ingredients/${id}`,
            })

            dispatch(deleteIngredientSuccess(res.data))
            dispatch(getIngredients());
        } catch (err) {
            dispatch(deleteIngredientFailed(err.response.data))
        }
    }
}

