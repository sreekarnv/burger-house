import { combineReducers } from 'redux';

import authReducer from './auth';
import menuReducer from './menu';
import burgerBuilderReducer from './burgerBuilder';
import customerReducer from './customer';
import cartReducer from './cart';
import userReducer from './users';
import orderReducer from './orders';
import ingredientReducer from './ingredients';


const reducer = combineReducers({
    menu: menuReducer,
    customer: customerReducer,
    burgerBuilder: burgerBuilderReducer,
    cart: cartReducer,
    auth: authReducer,
    users: userReducer,
    orders: orderReducer,
    ingredients: ingredientReducer,
});

export default reducer;
