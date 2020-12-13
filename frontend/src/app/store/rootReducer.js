import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer";
import reviewReducer from "./reducers/reviewReducer";
import burgerReducer from "./reducers/burgerReducer";
import cartReducer from "./reducers/cartReducers";
import ingredientReducer from "./reducers/ingredientReducers";
import customBurgerReducer from "./reducers/customBurgerReducer";
import orderReducer from "./reducers/orderReducer";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer";

const reducer = combineReducers({
	reviews: reviewReducer,
	auth: authReducer,
	burgers: burgerReducer,
	cart: cartReducer,
	ingredients: ingredientReducer,
	customBurger: customBurgerReducer,
	orders: orderReducer,
	user: userReducer,
	admin: adminReducer,
});

export default reducer;
