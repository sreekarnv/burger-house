import { configureStore } from '@reduxjs/toolkit';
import appReducer from './modules/app';
import geoLocationReducer from './modules/geoLocation';
import cartReducer from './modules/cart';
import customBurgerReducer from './modules/customBurger';

export const store = configureStore({
  reducer: {
    app: appReducer,
    geolocation: geoLocationReducer,
    cart: cartReducer,
    customBurger: customBurgerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
