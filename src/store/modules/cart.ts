import { createSlice } from '@reduxjs/toolkit';
import { CartBurger } from '../types';

interface CartState {
  items: CartBurger[];
  value: number;
  price: number;
}

const initialState: CartState = {
  items: [],
  price: 0,
  value: 0,
};

export const appSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addBurgerToCart: (state, action) => {
      const cartArr = [...state.items];

      if (cartArr.find((burger) => burger._id === action.payload.burger._id)) {
        const burgerIndex = cartArr.findIndex(
          (burger) => burger._id === action.payload.burger._id
        );
        cartArr[burgerIndex]!.itemsInCart++;
      } else {
        cartArr.push({ ...action.payload.burger, itemsInCart: 1 });
      }

      const cartPrice = state.price + action.payload.burger.price;

      localStorage.setItem(
        'cart',
        JSON.stringify({
          items: cartArr,
          price: cartPrice,
          value: state.value + 1,
        })
      );

      state.items = cartArr;
      state.price = cartPrice;
      state.value = state.value + 1;
    },
    removeBurgerFromCart: (state, action) => {
      const cartArr = [...state.items];

      // if burger already exists
      if (cartArr.find((burger) => burger._id === action.payload.burger._id)) {
        const burgerIndex = cartArr.findIndex(
          (burger) => burger._id === action.payload.burger._id
        );

        if (burgerIndex !== -1) {
          if (cartArr[burgerIndex]!.itemsInCart > 1) {
            cartArr[burgerIndex]!.itemsInCart--;
          } else {
            cartArr.splice(burgerIndex, 1);
          }
        }
      }

      const cartPrice = state.price - action.payload.burger.price;

      localStorage.setItem(
        'cart',
        JSON.stringify({
          items: cartArr,
          price: cartPrice,
          value: state.value - 1,
        })
      );

      state.items = cartArr;
      state.price = cartPrice;
      state.value = state.value - 1;
    },
    removeBurgerInstancesFromCart: (state, action) => {
      const cartArr = [...state.items];

      if (cartArr.find((burger) => burger._id === action.payload.burger._id)) {
        const burgerIndex = cartArr.findIndex(
          (burger) => burger._id === action.payload.burger._id
        );

        cartArr.splice(burgerIndex, 1);
      }

      const cartPrice =
        state.price -
        action.payload.burger.price * action.payload.burger.itemsInCart;

      const cartValue = state.value - action.payload.burger.itemsInCart;

      localStorage.setItem(
        'cart',
        JSON.stringify({
          items: cartArr,
          price: cartPrice,
          value: cartValue,
        })
      );

      state.items = cartArr;
      state.price = cartPrice;
      state.value = cartValue;
    },
    clearCart: (state) => {
      state.items = [];
      state.price = 0;
      state.value = 0;

      localStorage.removeItem('cart');
    },
    initCart: (state) => {
      const cart = JSON.parse(localStorage.getItem('cart') || '{}');

      state.items = cart.items || [];
      state.price = cart.price || 0;
      state.value = cart.value || 0;
    },
  },
});

export const {
  addBurgerToCart,
  removeBurgerFromCart,
  removeBurgerInstancesFromCart,
  clearCart,
  initCart,
} = appSlice.actions;

export default appSlice.reducer;
