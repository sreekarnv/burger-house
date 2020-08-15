import * as actionTypes from '../actions/actions';


const initialState = {
    Burgers: null,
    cart: 0,
    totalPrice: 0,
}


const removeItemFromCart = (state, action) => {
    let items = state.Burgers[action.burgerObj.title].items;
    let totalPrice = state.totalPrice - state.Burgers[action.burgerObj.title].price;
    const cart = state.cart - items;
    items = 0;

    return {
        ...state,
        Burgers: {
            ...state.Burgers,
            [action.burgerObj.title]: undefined
        },
        cart,
        totalPrice
    }
};

const incrementItem = (state, action) => {
    let items = state.Burgers[action.burgerObj.title].items;
    let price = state.Burgers[action.burgerObj.title].price + state.Burgers[action.burgerObj.title].initialprice;
    let totalPrice = state.totalPrice + state.Burgers[action.burgerObj.title].initialprice;
    const cart = state.cart + 1;
    items += 1;

    return {
        ...state,
        Burgers: {
            ...state.Burgers,
            [action.burgerObj.title]: {
                ...state.Burgers[action.burgerObj.title],
                items,
                price,
            }
        },
        cart,
        totalPrice
    }
};

const decrementItem = (state, action) => {
    let Burgers = { ...state.Burgers };
    let items = state.Burgers[action.burgerObj.title].items;
    let price = state.Burgers[action.burgerObj.title].price - state.Burgers[action.burgerObj.title].initialprice;
    let totalPrice = state.totalPrice - state.Burgers[action.burgerObj.title].initialprice;
    const cart = state.cart - 1;
    items -= 1;

    if (items > 0) {
        Burgers = {
            ...state.Burgers,
            [action.burgerObj.title]: {
                ...state.Burgers[action.burgerObj.title],
                items,
                price,
            }
        }
    } else {
        Burgers = {
            ...state.Burgers,
            [action.burgerObj.title]: undefined
        }
    }
    return {
        ...state,
        Burgers,
        cart,
        totalPrice
    }
};

const addBurgersToCart = (state, action) => {
    let totalPrice;
    let Burger = { ...state.Burgers }

    if (action.burgerObj.title === 'customBurger') {
        action.burgerObj.title = `${action.burgerObj.title}-${action.burgerObj.id}`
    }

    if ((Object.keys(Burger).includes(action.burgerObj.title))) {
        Burger[action.burgerObj.title].items += 1;
        Burger[action.burgerObj.title].price += Burger[action.burgerObj.title].initialprice;
        totalPrice = state.totalPrice + Burger[action.burgerObj.title].initialprice

    } else {
        Burger[action.burgerObj.title] = action.burgerObj;
        Burger[action.burgerObj.title].items += 1;
        Burger[action.burgerObj.title].price = Burger[action.burgerObj.title].initialprice;
        totalPrice = state.totalPrice + Burger[action.burgerObj.title].initialprice
    }

    return {
        ...state,
        Burgers: Burger,
        cart: state.cart + 1,
        totalPrice
    }
};

const clearCart = (state, action) => {
    return {
        ...state,
        cart: 0,
        totalPrice: 0,
        Burgers: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_BURGERS_TO_CART): return addBurgersToCart(state, action)
        case (actionTypes.INCREMENT_ITEM): return incrementItem(state, action)
        case (actionTypes.DECREMENT_ITEM): return decrementItem(state, action)
        case (actionTypes.REMOVE_ALL_ITEMS): return removeItemFromCart(state, action)

        case (actionTypes.CLEAR_CART): return clearCart(state, action);
        default: return state;
    }
};

export default reducer;