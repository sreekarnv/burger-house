import * as actionTypes from './actions';
import axios from 'axios';


export const getAllUsersInit = () => {
    return {
        type: actionTypes.GET_ALL_USERS_INIT
    }
}

export const getAllUsersSuccess = users => {
    return {
        type: actionTypes.GET_ALL_USERS_SUCCESS,
        users
    }
}

export const getAllUsersFailed = error => {
    return {
        type: actionTypes.GET_ALL_USERS_FAILED,
        error
    }
}

export const getAllUsers = (data) => {
    return async dispatch => {
        dispatch(getAllUsersInit())
        try {
            let query;
            if (!data) {
                query = '';
            } else {
                query = Object.keys(data).map((el, i) => {
                    return `${i === 0 ? '?' : '&'}${el}=${data[el]}`
                })
            }
            const res = await axios({
                url: `/api/v1/users${query}`,
                method: 'get'
            });
            dispatch(getAllUsersSuccess(res.data.users))
        } catch (err) {
            dispatch(getAllUsersFailed(err))
        }
    }
}
///////////////////////////////////////////////////////

export const updateUserRoleInit = () => {
    return {
        type: actionTypes.UPDATE_ONE_USER_INIT
    }
}

export const updateUserRoleFailed = error => {
    return {
        type: actionTypes.UPDATE_ONE_USER_FAILED,
        error
    }
}

export const updateUserRole = (id, data) => {
    return async dispatch => {
        dispatch(updateUserRoleInit());
        try {
            await axios({
                method: 'PATCH',
                url: `/api/v1/users/${id}`,
                data
            });
            dispatch(getAllUsers())
        } catch (err) {
            updateUserRoleFailed({ ...err.response.data })
        }
    }
}

/////////////////////////////////////////////////////////////////////

export const deleteUserInit = () => {
    return {
        type: actionTypes.DELETE_ONE_USER_INIT
    }
}

export const deleteUserFailed = (error) => {
    return {
        type: actionTypes.DELETE_ONE_USER_FAILED,
        error
    }
}

export const deleteUser = (id) => {
    return async dispatch => {
        try {
            await axios({
                method: 'DELETE',
                url: `/api/v1/users/${id}`,
            });
            dispatch(getAllUsers())
        } catch (err) {
            deleteUserFailed({ ...err.response.data })
        }
    }
}