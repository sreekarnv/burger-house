import * as actionTypes from '../actions/actions';


const initialState = {
    getUsersInit: false,
    getUsersStatus: null,

    updateUserInit: false,
    updateUserStatus: null,

    deleteUserInit: false,
    deleteUserStatus: null,

    users: null
}

const getAllUsersInit = (state, action) => {
    return {
        ...state,
        getUsersInit: true,
        getUsersStatus: null,
    }
}


const getAllUsersSuccess = (state, action) => {
    return {
        ...state,
        getUsersInit: false,
        getUsersStatus: 'success',
        users: action.users
    }
}

const getAllUsersFailed = (state, action) => {
    return {
        ...state,
        getUsersInit: false,
        users: null,
        getUsersStatus: action.error,
    }
}

const updateUserInit = (state, action) => {
    return {
        ...state,
        updateUserInit: true,
    }
}


const updateUserFailed = (state, action) => {
    return {
        ...state,
        updateUserInit: false,
        updateUserStatus: action.error,
    }
}

const deleteUserInit = (state, action) => {
    return {
        ...state,
        deleteUserInit: true,
    }
}

const deleteUserFailed = (state, action) => {
    return {
        ...state,
        deleteUserInit: false,
        deleteUserStatus: action.error,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USERS_INIT: return getAllUsersInit(state, action);
        case actionTypes.GET_ALL_USERS_SUCCESS: return getAllUsersSuccess(state, action);
        case actionTypes.GET_ALL_USERS_FAILED: return getAllUsersFailed(state, action);

        case actionTypes.UPDATE_ONE_USER_INIT: return updateUserInit(state, action);
        case actionTypes.UPDATE_ONE_USER_FAILED: return updateUserFailed(state, action);

        case actionTypes.DELETE_ONE_USER_INIT: return deleteUserInit(state, action);
        case actionTypes.DELETE_ONE_USER_FAILED: return deleteUserFailed(state, action);

        default: return state;
    }
}

export default reducer;