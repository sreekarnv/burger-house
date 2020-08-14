import * as actionTypes from './actions';
import axios from 'axios';


/////////////////////////////////////////////////////////////////////////////////////

export const checkAuthInit = () => {
    return {
        type: actionTypes.CHECK_AUTH_STATE_INIT,
    }
}


export const checkAuthSuccess = user => {
    return {
        type: actionTypes.CHECK_AUTH_STATE_SUCCESS,
        user
    }
}

export const checkAuthFailed = () => {
    return {
        type: actionTypes.CHECK_AUTH_STATE_FAILED,
    }
}

export const checkAuth = () => {
    return async dispatch => {
        dispatch(checkAuthInit());
        try {
            let res = await axios.get(`/api/v1/users/checkAuth`)
            dispatch(checkAuthSuccess(res.data.user))
        } catch (err) {
            dispatch(checkAuthFailed(err));
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////
// REGISTER USER

export const registerInit = () => {
    return {
        type: actionTypes.REGISTER_USER_INIT
    }
}

export const registerSuccess = res => {
    return {
        type: actionTypes.REGISTER_USER_SUCCESS,
        response: res
    }
}


export const registerFailed = error => {
    return {
        type: actionTypes.REGISTER_USER_FAILED,
        error
    }
}

export const register = (data) => {
    return async dispatch => {
        dispatch(registerInit());
        try {
            const res = await axios({
                method: 'POST',
                url: `/api/v1/users/register`,
                data
            })
            dispatch(registerSuccess(res))
        } catch (err) {
            let error = { ...err }.response ? { ...err }.response : err;
            dispatch(registerFailed(error))
        }
    }
}

//////////////////////////////////////////////////////////////////////
// LOGIN USER


export const loginInit = () => {
    return {
        type: actionTypes.LOGIN_USER_INIT
    }
}

export const loginSuccess = res => {
    return {
        type: actionTypes.LOGIN_USER_SUCCESS,
        response: res
    }
}


export const loginFailed = error => {
    return {
        type: actionTypes.LOGIN_USER_FAILED,
        error
    }
}

export const login = (data) => {
    return async dispatch => {
        dispatch(loginInit());
        try {
            const res = await axios({
                method: 'POST',
                url: `/api/v1/users/login`,
                data
            })
            dispatch(loginSuccess(res.data))
        } catch (err) {
            let error = { ...err }.response ? { ...err }.response.data : err;
            dispatch(loginFailed(error))
        }
    }
}
/////////////////////////////////////////////////////////////////////////
// LOGOUT USER

export const logoutInit = () => {
    return {
        type: actionTypes.LOGOUT_USER_INIT
    }
}

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_USER_SUCCESS,
        user: null
    }
}


export const logoutFailed = err => {
    return {
        type: actionTypes.LOGOUT_USER_FAILED,
        error: err
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(logoutInit());
        try {
            await axios.get(`/api/v1/users/logout`)
            dispatch(logoutSuccess());
        } catch (err) {
            let error = { ...err }.response ? { ...err }.response.data : err
            dispatch(logoutFailed(error))
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
// UPDATE CURRENT USER DATA


export const updateCurrentUserInit = () => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER_INIT
    }
}

export const updateCurrentUserSuccess = user => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER_SUCCESS,
        user
    }
}


export const updateCurrentUserFailed = err => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER_FAILED,
        error: err
    }
}


export const updateCurrentUser = (data) => {
    return async dispatch => {
        dispatch(updateCurrentUserInit());
        try {
            const res = await axios({
                method: 'PATCH',
                url: `/api/v1/users/me`,
                data,
            })
            dispatch(updateCurrentUserSuccess(res.data.user))
        } catch (err) {
            let error = { ...err }.response ? { ...err }.response.data : err
            dispatch(updateCurrentUserFailed(error))
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////
// Update current user password


export const updateCurrentUserPasswordInit = () => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER_PASSWORD_INIT
    }
}

export const updateCurrentUserPasswordSuccess = user => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER_PASSWORD_SUCCESS,
        user
    }
}


export const updateCurrentUserPasswordFailed = err => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER_PASSWORD_FAILED,
        error: err
    }
}

export const updateCurrentUserPassword = (data) => {
    return async dispatch => {
        dispatch(updateCurrentUserPasswordInit());
        try {
            await axios({
                method: 'PATCH',
                url: `/api/v1/users/updateCurrentUserPassword`,
                data,
            })
            dispatch(updateCurrentUserPasswordSuccess())
        } catch (err) {
            let error = { ...err }.response ? { ...err }.response.data : err
            dispatch(updateCurrentUserPasswordFailed(error))
        }
    }
}

///////////////////////////////////////////////////////////////////////
// delete current user


export const deleteCurrentUserInit = () => {
    return {
        type: actionTypes.DELETE_CURRENT_USER_INIT
    }
}


export const deleteCurrentUserSuccess = () => {
    return {
        type: actionTypes.DELETE_CURRENT_USER_SUCCESS
    }
}


export const deleteCurrentUserFailed = err => {
    return {
        type: actionTypes.DELETE_CURRENT_USER_FAILED,
        error: err
    }
}

export const deleteCurrentUser = () => {
    return async dispatch => {
        try {
            await axios({
                method: 'DELETE',
                url: `/api/v1/users/me`,
            })
            dispatch(deleteCurrentUserSuccess());
            dispatch(logout());
        } catch (err) {
            dispatch(deleteCurrentUserFailed(err.response.data))
        }
    }
}