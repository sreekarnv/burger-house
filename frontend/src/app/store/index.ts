import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import burgerReducer from './reducers/burgerReducer';
import cartReducer from './reducers/cartReducers';
import customBurgerReducer from './reducers/customBurgerReducer';
import geoLocationReducer from './reducers/geoLocationReducer';
import reviewReducer from './reducers/reviewReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
	location: geoLocationReducer,
	reviews: reviewReducer,
	burgers: burgerReducer,
	cart: cartReducer,
	customBurger: customBurgerReducer,
});

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? // @ts-ignore
		  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? // @ts-ignore
			  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
			: compose
		: compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

export default store;
