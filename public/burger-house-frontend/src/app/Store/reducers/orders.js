import * as actionTypes from './../actions/actions';

const initialState = {
    userOrders: null,
    orders: null,

    order: null,

    getOrderStatus: null,
    getOrderInit: false,

    totalOrdersPrice: null,
    totalOrders: null,
    totalCompletedOrders: null,
    totalPendingOrders: null,
    totalCancelledOrders: null,

    getUserOrdersStatus: null,
    getUserOrdersInit: false,

    createUserOrderInit: false,
    createUserOrderStatus: null,

    getOrdersInit: false,
    getOrdersStatus: null,

    updateOrderStatusAdminInit: false,
    updateOrderStatusAdminStatus: {},

};

const createOrderInit = (state, action) => {
    return {
        ...state,
        createUserOrderInit: true
    }
}

const createOrderSuccess = (state, action) => {
    return {
        ...state,
        createUserOrderInit: false,
        createUserOrderStatus: 'success'
    }
}

const createOrderFailed = (state, action) => {
    return {
        ...state,
        createUserOrderInit: false,
        createUserOrderStatus: action.error
    }
}

const getUserOrdersInit = (state, action) => {
    return {
        ...state,
        getUserOrdersInit: true
    }
}

const getUserOrdersSuccess = (state, action) => {
    return {
        ...state,
        getUserOrdersInit: false,
        userOrders: action.orders,
        getUserOrdersStatus: 'success'
    }
}

const getUserOrdersFailed = (state, action) => {
    return {
        ...state,
        getUserOrdersInit: false,
        getUserOrdersStatus: action.error
    }
}

const getAllOrdersInit = (state, action) => {

    return {
        ...state,
        getOrdersInit: true
    }
}

const getAllOrdersSuccess = (state, action) => {
    return {
        ...state,
        getOrdersInit: false,
        orders: action.orders,
        getOrdersStatus: 'success',
        totalOrdersPrice: action.totalPrice,
        totalOrders: action.totalOrders,
        totalCompletedOrders: action.completedOrders,
        totalPendingOrders: action.pendingOrders,
        totalCancelledOrders: action.totalOrders - action.completedOrders - action.pendingOrders
    }
}

const getOrdersFailed = (state, action) => {
    return {
        ...state,
        getOrderInit: false,
        getOrderStatus: action.error
    }
}

const getOrderInit = (state, action) => {
    return {
        ...state,
        getOrderInit: true,
        getOrderStatus: null
    }
}

const getOrderSuccess = (state, action) => {
    return {
        ...state,
        getOrderInit: false,
        getOrderStatus: 'success',
        order: action.order
    }
}

const getAllOrdersFailed = (state, action) => {
    return {
        ...state,
        getOrdersInit: false,
        getOrdersStatus: action.error
    }
}


const clearCart = (state, action) => {
    return {
        ...state,
        getUserOrdersStatus: null,
        getUserOrdersInit: false,

        createUserOrderInit: false,
        createUserOrderStatus: null
    }
}


const updateOrderStatusAdminInit = (state, action) => {
    return {
        ...state,
        updateOrderStatusAdminInit: true,
        updateOrderStatusAdminStatus: null,
    }
}

const updateOrderStatusAdminSuccess = (state, action) => {
    return {
        ...state,
        updateOrderStatusAdminInit: false,
        updateOrderStatusAdminStatus: action.response,
    }
}

const updateOrderStatusAdminFailed = (state, action) => {
    return {
        ...state,
        updateOrderStatusAdminInit: false,
        updateOrderStatusAdminStatus: action.error,
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USER_ORDERS_INIT: return getUserOrdersInit(state, action)
        case actionTypes.GET_ALL_USER_ORDERS_SUCCESS: return getUserOrdersSuccess(state, action)
        case actionTypes.GET_ALL_USER_ORDERS_FAILED: return getUserOrdersFailed(state, action)

        case actionTypes.CREATE_ORDER_INIT: return createOrderInit(state, action)
        case actionTypes.CREATE_ORDER_SUCCESS: return createOrderSuccess(state, action)
        case actionTypes.CREATE_ORDER_FAILED: return createOrderFailed(state, action)

        case actionTypes.CLEAR_CART: return clearCart(state, action);

        case actionTypes.GET_ALL_ORDERS_INIT: return getAllOrdersInit(state, action);
        case actionTypes.GET_ALL_ORDERS_SUCCESS: return getAllOrdersSuccess(state, action);
        case actionTypes.GET_ALL_ORDERS_FAILED: return getAllOrdersFailed(state, action);

        case actionTypes.UPDATE_ORDER_ADMIN_STATUS_INIT: return updateOrderStatusAdminInit(state, action);
        case actionTypes.UPDATE_ORDER_ADMIN_STATUS_SUCCESS: return updateOrderStatusAdminSuccess(state, action);
        case actionTypes.UPDATE_ORDER_ADMIN_STATUS_FAILED: return updateOrderStatusAdminFailed(state, action);

        case actionTypes.GET_ORDER_INIT: return getOrderInit(state, action);
        case actionTypes.GET_ORDER_SUCCESS: return getOrderSuccess(state, action);
        case actionTypes.GET_ORDER_FAILED: return getOrdersFailed(state, action);

        default: return state
    }
}

export default reducer;