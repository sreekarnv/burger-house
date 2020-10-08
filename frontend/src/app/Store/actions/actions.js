// get user reviews
export const DISPLAY_USER_REVIEW = 'DISPLAY_USER_REVIEW';

// Add Ingredient
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

///////////////////////////////////////////////////////////////////////////
// BURGER BUILDER

// fetch Ingredients
export const FETCH_INGREDIENTS_INIT = 'FETCH_INGREDIENTS_INIT';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';


// fetch burgers

export const FETCH_BURGERS_INIT = 'FETCH_BURGERS_INIT';
export const FETCH_BURGERS_SUCCESS = 'FETCH_BURGERS_SUCCESS';
export const FETCH_BURGERS_FAILED = 'FETCH_BURGERS_FAILED';


// Clear ingredient values after adding burger to cart
export const CLEAR_INGREDIENT_VALUES = 'CLEAR_INGREDIENT_VALUES';

// Clear total price after adding burger to cart
export const CLEAR_TOTAL_PRICE = 'CLEAR_TOTAL_PRICE';

///////////////////////////////////////////////////////////////////////////////////
// CART action

// Increment item in cart
export const INCREMENT_ITEM = 'INCREMENT_ITEM';

// decrement item in cart
export const DECREMENT_ITEM = 'DECREMENT_ITEM';

// delete all burgers in cart
export const REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS';

// Push a burger to cart
export const ADD_BURGERS_TO_CART = 'ADD_BURGERS_TO_CART';
///////////////////////////////////////////////////////////////////////////////////
// AUTH
// Registering Users
export const REGISTER_USER_INIT = 'REGISTER_USER_INIT';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

// Logging in Users
export const LOGIN_USER_INIT = 'LOGIN_USER_INIT';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

// Check for logged in user
export const CHECK_AUTH_STATE_INIT = 'CHECK_AUTH_STATE_INIT';
export const CHECK_AUTH_STATE_SUCCESS = 'CHECK_AUTH_STATE_SUCCESS';
export const CHECK_AUTH_STATE_FAILED = 'CHECK_AUTH_STATE_FAILED';

// Logout a user
export const LOGOUT_USER_INIT = 'LOGOUT_USER_INIT';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

// send email confirmation
export const SEND_EMAIL_CONFIRMATION_INIT = 'SEND_EMAIL_CONFIRMATION_INIT';
export const SEND_EMAIL_CONFIRMATION_SUCCESS = 'SEND_EMAIL_CONFIRMATION_SUCCESS';
export const SEND_EMAIL_CONFIRMATION_FAILED = 'SEND_EMAIL_CONFIRMATION_FAILED';

// Verifying Account
export const VERIFY_ACCOUNT_INIT = 'VERIFY_ACCOUNT_INIT';
export const VERIFY_ACCOUNT_SUCCESS = 'VERIFY_ACCOUNT_SUCCESS';
export const VERIFY_ACCOUNT_FAILED = 'VERIFY_ACCOUNT_FAILED';

//////////////////////////////////////////////////////////////////////////////////////
// USERS

// get all users
export const GET_ALL_USERS_INIT = 'GET_ALL_USERS_INIT';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILED = 'GET_ALL_USERS_FAILED';

// update role of a user
export const UPDATE_ONE_USER_INIT = 'UPDATE_ONE_USER_INIT';
export const UPDATE_ONE_USER_FAILED = 'UPDATE_ONE_USER_FAILED'

/////////////////////////////////////////////////////////////////////////////////////
// CURRENT USER
// get all orders of a user
export const GET_ALL_USER_ORDERS_INIT = 'GET_ALL_USER_ORDERS_INIT';
export const GET_ALL_USER_ORDERS_SUCCESS = 'GET_ALL_USER_ORDERS_SUCCESS';
export const GET_ALL_USER_ORDERS_FAILED = 'GET_ALL_USER_ORDERS_FAILED';

// update current user data
export const UPDATE_CURRENT_USER_INIT = 'UPDATE_CURRENT_USER_INIT';
export const UPDATE_CURRENT_USER_SUCCESS = 'UPDATE_CURRENT_USER_SUCCESS';
export const UPDATE_CURRENT_USER_FAILED = 'UPDATE_CURRENT_USER_FAILED';

// update current user password
export const UPDATE_CURRENT_USER_PASSWORD_INIT = 'UPDATE_CURRENT_USER_PASSWORD_INIT';
export const UPDATE_CURRENT_USER_PASSWORD_SUCCESS = 'UPDATE_CURRENT_USER_PASSWORD_SUCCESS';
export const UPDATE_CURRENT_USER_PASSWORD_FAILED = 'UPDATE_CURRENT_USER_PASSWORD_FAILED';

//delete current user
export const DELETE_CURRENT_USER_INIT = 'DELETE_CURRENT_USER_INIT';
export const DELETE_CURRENT_USER_SUCCESS = 'DELETE_CURRENT_USER_SUCCESS';
export const DELETE_CURRENT_USER_FAILED = 'DELETE_CURRENT_USER_FAILED';


// delete a user
export const DELETE_ONE_USER_INIT = 'DELETE_ONE_USER_INIT';
export const DELETE_ONE_USER_FAILED = 'DELETE_ONE_USER_FAILED';
/////////////////////////////////////////////////////////////////////////////////////////////////
// ORDERS
// clear cart 
export const CLEAR_CART = 'CLEAR_CART';

// place a new order
export const CREATE_ORDER_INIT = 'CREATE_ORDER_INIT';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

// get all orders of all users
export const GET_ALL_ORDERS_INIT = 'GET_ALL_ORDERS_INIT';
export const GET_ALL_ORDERS_SUCCESS = 'GET_ALL_ORDERS_SUCCESS';
export const GET_ALL_ORDERS_FAILED = 'GET_ALL_ORDERS_FAILED';

// Update Order Status ADMIN

export const UPDATE_ORDER_ADMIN_STATUS_INIT = 'UPDATE_ORDER_ADMIN_STATUS_INIT'
export const UPDATE_ORDER_ADMIN_STATUS_SUCCESS = 'UPDATE_ORDER_ADMIN_STATUS_SUCCESS'
export const UPDATE_ORDER_ADMIN_STATUS_FAILED = 'UPDATE_ORDER_ADMIN_STATUS_FAILED'


// Get Single Order

export const GET_ORDER_INIT = 'GET_ORDER_INIT'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

////////////////////////////////////////////////////////////////////////////////////
// UPDATE MENU

// ingredients while updating or creating a burger
export const UPDATE_MENU_REMOVE_INGREDIENT = 'UPDATE_MENU_REMOVE_INGREDIENT';
export const UPDATE_MENU_ADD_INGREDIENT = 'UPDATE_MENU_ADD_INGREDIENT';

// set ingredients while updating or creating a burger
export const SET_MENU_INGREDIENTS = 'SET_MENU_INGREDIENTS';

// update a burger
export const UPDATE_BURGER_INIT = 'UPDATE_BURGER_INIT';
export const UPDATE_BURGER_SUCCESS = 'UPDATE_BURGER_SUCCESS';
export const UPDATE_BURGER_FAILED = 'UPDATE_BURGER_FAILED';

// create a new burger
export const CREATE_BURGER_INIT = 'CREATE_BURGER_INIT';
export const CREATE_BURGER_SUCCESS = 'CREATE_BURGER_SUCCESS';
export const CREATE_BURGER_FAILED = 'CREATE_BURGER_FAILED';


// delete a burger
export const DELETE_BURGER_INIT = 'DELETE_BURGER_INIT';
export const DELETE_BURGER_SUCCESS = 'DELETE_BURGER_SUCCESS';
export const DELETE_BURGER_FAILED = 'DELTE_BURGER_FAILED';

///////////////////////////////////////////////////////////////////////////////////
// INGREDIENTS

// get ingredients

export const GET_INGREDIENTS_INIT = 'GET_INGREDIENTS_INIT';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';


// create ingredients

export const CREATE_INGREDIENTS_INIT = 'CREATE_INGREDIENTS_INIT'
export const CREATE_INGREDIENTS_SUCCESS = 'CREATE_INGREDIENTS_SUCCESS'
export const CREATE_INGREDIENTS_FAILED = 'CREATE_INGREDIENTS_FAILED'

// update ingredients

export const UPDATE_INGREDIENT_INIT = 'UPDATE_INGREDIENT_INIT'
export const UPDATE_INGREDIENT_SUCCESS = 'UPDATE_INGREDIENT_SUCCESS'
export const UPDATE_INGREDIENT_FAILED = 'UPDATE_INGREDIENT_FAILED'


// get ingredient

export const GET_INGREDIENT_INIT = 'GET_INGREDIENT_INIT';
export const GET_INGREDIENT_SUCCESS = 'GET_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_FAILED = 'GET_INGREDIENT_FAILED';

// delete Ingredient

export const DELETE_INGREDIENT_INIT = 'DELETE_INGREDIENT_INIT'
export const DELETE_INGREDIENT_FAILED = 'DELETE_INGREDIENT_FAILED'
export const DELETE_INGREDIENT_SUCCESS = 'DELETE_INGREDIENT_SUCCESS'