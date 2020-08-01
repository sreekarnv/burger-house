import * as actionTypes from './actions';
import axios from 'axios';



export const getAllUserOrdersInit = () => {
    return {
        type: actionTypes.GET_ALL_USER_ORDERS_INIT
    }
}

export const getAllUserOrdersSuccess = (orders) => {
    return {
        type: actionTypes.GET_ALL_USER_ORDERS_SUCCESS,
        orders
    }
}

export const getAllUserOrdersFailed = error => {
    return {
        type: actionTypes.GET_ALL_USER_ORDERS_FAILED,
        error
    }
}

export const getAllUserOrders = () => {
    return async dispatch => {
        dispatch(getAllUserOrdersInit());
        try {
            const res = await axios.get(`/api/v1/orders/me`)
            let order = Object.keys(res.data.orders).map(el => {
                return {
                    ...res.data.orders[el],
                    orders: [...res.data.orders[el].customOrders, ...res.data.orders[el].menuOrders],
                    customOrders: null,
                    menuOrders: null,
                }
            })
            dispatch(getAllUserOrdersSuccess(order));
        } catch (err) {
            const error = { ...err }.response
            dispatch(getAllUserOrdersFailed(error));
        }
    }
}


export const createOrdersInit = () => {
    return {
        type: actionTypes.CREATE_ORDER_INIT
    }
}

export const createOrdersSuccess = (orders) => {
    return {
        type: actionTypes.CREATE_ORDER_SUCCESS,
        orders
    }
}

export const createOrdersFailed = error => {
    return {
        type: actionTypes.CREATE_ORDER_FAILED,
        error
    }
}

export const createOrders = (data) => {
    return async dispatch => {
        dispatch(createOrdersInit());
        try {
            const res = await axios({
                method: 'POST',
                url: `/api/v1/orders`,
                data
            })
            dispatch(createOrdersSuccess(res.data.orders))
        } catch (err) {
            const error = { ...err }.response
            dispatch(createOrdersFailed(error));
        }
    }
}

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART
    }
}

export const getAllOrdersInit = () => {
    return {
        type: actionTypes.GET_ALL_USER_ORDERS_INIT
    }
}

export const getAllOrdersSuccess = ({ order, totalOrders, pendingOrders, completedOrders, totalPrice }) => {
    return {
        type: actionTypes.GET_ALL_ORDERS_SUCCESS,
        orders: order,
        totalOrders,
        pendingOrders,
        completedOrders,
        totalPrice
    }
}

export const getAllOrdersFailed = error => {
    return {
        type: actionTypes.GET_ALL_ORDERS_FAILED,
        error
    }
}

export const getAllOrders = (filter) => {
    return async dispatch => {
        dispatch(getAllOrdersInit());
        try {
            let order = [];
            let query = '', res2;

            const res = await axios.get(`/api/v1/orders`)

            if (filter !== 'All Orders') {
                query = `?status=${filter}`
                res2 = await axios.get(`/api/v1/orders${query}`)

                Object.keys(res2.data.orders).map(el => {
                    order.push({
                        ...res2.data.orders[el],
                        orders: [...res.data.orders[el].customOrders, ...res.data.orders[el].menuOrders],
                        customOrders: null,
                        menuOrders: null,
                    })
                    return order;
                })


            }

            let totalOrders = res.data.orders.length;
            let totalPrice = 0;
            let pendingOrders = 0;
            let completedOrders = 0;

            Object.keys(res.data.orders).map(el => {
                if (res.data.orders[el].status === 'pending') {
                    pendingOrders += 1;
                } else if (res.data.orders[el].status === 'delivered') {
                    completedOrders += 1;
                }

                if (res.data.orders[el].status !== 'cancelled') totalPrice += res.data.orders[el].price;


                if (filter === 'All Orders') {
                    order.push({
                        ...res.data.orders[el],
                        orders: [...res.data.orders[el].customOrders, ...res.data.orders[el].menuOrders],
                        customOrders: null,
                        menuOrders: null,
                    })
                    return order;
                }
                return '';
            })


            dispatch(getAllOrdersSuccess({ order, totalOrders, pendingOrders, completedOrders, totalPrice }));

        } catch (err) {
            const error = { ...err }.response
            dispatch(getAllOrdersFailed(error));
        }
    }
}
///////////////////////////////////////////////////////////////

export const updateOrderStatusAdminInit = () => {
    return {
        type: actionTypes.UPDATE_ORDER_ADMIN_STATUS_INIT
    }
}

export const updateOrderStatusAdminSuccess = (res) => {
    return {
        type: actionTypes.UPDATE_ORDER_ADMIN_STATUS_SUCCESS,
        response: res
    }
}

export const updateOrderStatusAdminFailed = (error) => {
    return {
        type: actionTypes.UPDATE_ORDER_ADMIN_STATUS_FAILED,
        error
    }
}


export const updateOrderStatusAdmin = ({ status, _id }) => {
    return async dispatch => {
        try {
            const res = await axios({
                url: `/api/v1/orders/${_id}`,
                method: 'PATCH',
                data: { status }
            })
            dispatch(updateOrderStatusAdminSuccess(res.data))
        } catch (err) {
            dispatch(updateOrderStatusAdminSuccess(err.response.data))
        }
    }
}
////////////////////////////////////////////////////////////////////////

export const getOrderInit = () => {
    return {
        type: actionTypes.GET_ORDER_INIT
    }
}

export const getOrderSuccess = (order) => {
    return {
        type: actionTypes.GET_ORDER_SUCCESS,
        order
    }
}

export const getOrderFailed = error => {
    return {
        type: actionTypes.GET_ORDER_SUCCESS,
        error
    }
}


export const getOrder = (id) => {
    return async dispatch => {
        dispatch(getOrderInit())
        try {
            const res = await axios({
                url: `/api/v1/orders/${id}`,
                method: 'get',
            })

            let order;

            let customOrders = [];

            res.data.order.customOrders.map(el => {
                customOrders.push({
                    _id: {
                        ingredients: el.ingredients,
                        title: el.name,
                        foodType: el.foodType,
                        _id: el._id,
                        photo: el.photo,
                        price: el.price,
                    },
                    items: parseInt(el.items),
                })
            })

            order = {
                ...res.data.order,
                orders: [...customOrders, ...res.data.order.menuOrders],
                customOrders: null,
                menuOrders: null,
            }
            dispatch(getOrderSuccess(order))

        } catch (err) {
            dispatch(getOrderFailed(err.response.data))
        }
    }
}

