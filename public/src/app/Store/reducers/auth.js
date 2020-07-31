import * as actionTypes from './../actions/actions';

const initialState = {
    user: null,
    checkAuthInit: false,

    registerInit: false,
    registerStatus: null,

    loginStatus: null,
    loginInit: false,

    logoutInit: false,

    updateUserDataInit: false,
    updateUserDataStatus: null,

    updateUserPasswordInit: false,
    updateUserPasswordStatus: null,

    deleteUserInit: false,
    deleteUserStatus: null
}


const checkAuthSuccess = (state, action) => {
    let userPhoto = `http://localhost:4000/uploads/users/${action.user.photo}`
    return {
        ...state,
        user: { ...action.user, photo: userPhoto },
        checkAuthInit: false,
    }
}

const checkAuthStateInit = (state, action) => {
    return {
        ...state,
        checkAuthInit: true
    }
}


const registerInit = (state, action) => {
    return {
        ...state,
        registerStatus: null,
        registerInit: true
    }
}

const registerSuccess = (state, action) => {
    return {
        ...state,
        registerInit: false,
        registerStatus: action.response
    }
}

const registerFailed = (state, action) => {
    return {
        ...state,
        registerInit: false,
        registerStatus: action.error
    }
}





const loginInit = (state, action) => {
    return {
        ...state,
        loginStatus: null,
        loginInit: true
    }
}

const loginSuccess = (state, action) => {
    let userPhoto = `http://localhost:4000/uploads/users/${action.response.data.user.photo}`
    return {
        ...state,
        loginInit: false,
        loginStatus: action.response.data.status,
        user: { ...action.response.data.user, photo: userPhoto }
    }
}

const loginFailed = (state, action) => {
    return {
        ...state,
        loginInit: false,
        loginStatus: action.error,
        user: null
    }
}


const logoutInit = (state, action) => {
    return {
        ...state,
        logoutInit: true
    }
}

const logoutSuccess = (state, action) => {
    return {
        ...state,
        logoutInit: false,
        user: null
    }
}

const logoutFailed = (state, action) => {
    return {
        ...state,
        logoutInit: false,
    }
}


const updateUserDataInit = (state, action) => {
    return {
        ...state,
        updateUserDataInit: true
    }
}


const updateUserDataSuccess = (state, action) => {
    let userPhoto = `http://localhost:4000/uploads/users/${action.user.photo}`
    return {
        ...state,
        user: { ...action.user, photo: userPhoto },
        updateUserDataStatus: 'success',
        updateUserDataInit: false
    }
}

const updateUserDataFailed = (state, action) => {
    return {
        ...state,
        updateUserDataStatus: action.error,
        updateUserDataInit: false
    }
}




const updateUserPasswordInit = (state, action) => {
    return {
        ...state,
        updateUserPasswordInit: true
    }
}


const updateUserPasswordSuccess = (state, action) => {
    return {
        ...state,
        user: action.user,
        updateUserPasswordStatus: 'success',
        updateUserPasswordInit: false
    }
}

const updateUserPasswordFailed = (state, action) => {
    return {
        ...state,
        updateUserPasswordStatus: action.error,
        updateUserPasswordInit: false
    }
}


///////////////////////////////////////////////////////////////////////////

const deleteCurrentUserInit = (state, action) => {
    return {
        ...state,
        deleteUserInit: true,
        deleteUserStatus: null
    }
}

const deleteCurrentUserSuccess = (state, action) => {
    return {
        ...state,
        deleteUserInit: false,
        deleteUserStatus: 'success'
    }
}


const deleteCurrentUserFailed = (state, action) => {
    return {
        ...state,
        deleteUserInit: false,
        deleteUserStatus: action.error
    }
}

////////////////////////////////////////////////////////////////////////////////////

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHECK_AUTH_STATE_SUCCESS: return checkAuthSuccess(state, action);
        case actionTypes.CHECK_AUTH_STATE_INIT: return checkAuthStateInit(state, action)

        case actionTypes.REGISTER_USER_INIT: return registerInit(state, action);
        case actionTypes.REGISTER_USER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_USER_FAILED: return registerFailed(state, action);

        case actionTypes.LOGIN_USER_INIT: return loginInit(state, action);
        case actionTypes.LOGIN_USER_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_USER_FAILED: return loginFailed(state, action);

        case actionTypes.LOGOUT_USER_INIT: return logoutInit(state, action);
        case actionTypes.LOGOUT_USER_SUCCESS: return logoutSuccess(state, action);
        case actionTypes.LOGOUT_USER_FAILED: return logoutFailed(state, action);

        case actionTypes.UPDATE_CURRENT_USER_INIT: return updateUserDataInit(state, action);
        case actionTypes.UPDATE_CURRENT_USER_SUCCESS: return updateUserDataSuccess(state, action);
        case actionTypes.UPDATE_CURRENT_USER_FAILED: return updateUserDataFailed(state, action);

        case actionTypes.UPDATE_CURRENT_USER_PASSWORD_INIT: return updateUserPasswordInit(state, action);
        case actionTypes.UPDATE_CURRENT_USER_PASSWORD_SUCCESS: return updateUserPasswordSuccess(state, action);
        case actionTypes.UPDATE_CURRENT_USER_PASSWORD_FAILED: return updateUserPasswordFailed(state, action);

        case actionTypes.DELETE_CURRENT_USER_INIT: return deleteCurrentUserInit(state, action)
        case actionTypes.DELETE_CURRENT_USER_SUCCESS: return deleteCurrentUserSuccess(state, action);
        case actionTypes.DELETE_CURRENT_USER_FAILED: return deleteCurrentUserFailed(state, action)

        default: return state;
    }
}


export default reducer;