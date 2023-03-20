import { createSlice } from '@reduxjs/toolkit';
import type { Ingredient } from '../../server/models/ingredient.model';

export type CartIngredient = Ingredient & { amount: number };

interface CustomBurgerState {
  ingredients: CartIngredient[];
  displayIngredients: CartIngredient[];
  burgerPrice: number;
}

const initialState: CustomBurgerState = {
  ingredients: [],
  displayIngredients: [],
  burgerPrice: 350,
};

export const customBurgerSlice = createSlice({
  name: 'customBurger',
  initialState,
  reducers: {
    initIngredients: (state, action) => {
      const ingredients = action.payload.ingredients;
      const displayIngs: any = [];

      ingredients.forEach((el: any) => {
        if (!el.amount) el['amount'] = 0;

        if (el.amount !== 0) {
          for (let i = 1; i <= el.amount; i++) {
            displayIngs.push(el);
          }
        }
      });

      state.ingredients = action.payload.ingredients;
      state.displayIngredients = displayIngs;
    },

    addIngredient: (state, action) => {
      const ingredients: CartIngredient[] = [...state.ingredients];
      const ingredientIndex = ingredients.findIndex(
        (el: any) => el.name === action.payload.ingredient.name
      );

      ingredients[ingredientIndex]!.amount!++;
      const burgerPrice =
        state.burgerPrice + ingredients[ingredientIndex]!.price;

      const displayIngredients = [...state.displayIngredients];
      displayIngredients.push({
        ...action.payload.ingredient,
        ingId: `${action.payload.ingredient.name}-${Date.now()}`,
      });

      state.ingredients = ingredients;
      state.displayIngredients = displayIngredients;
      state.burgerPrice = burgerPrice;
    },

    removeIngredient: (state, action) => {
      const ingredients: any = [...state.ingredients];
      const ingredientIndex = ingredients.findIndex(
        (el: any) => el.name === action.payload.ingredient.name
      );

      let burgerPrice = state.burgerPrice;
      if (ingredients[ingredientIndex].amount! > 0) {
        burgerPrice -= ingredients[ingredientIndex].price;
        ingredients[ingredientIndex].amount!--;
      }

      const displayIngredients = [...state.displayIngredients];
      const displayIngIndex = displayIngredients.findIndex(
        (el) => el._id === action.payload.ingredient._id
      );

      if (displayIngIndex !== -1) {
        displayIngredients.splice(displayIngIndex, 1);
      }

      state.ingredients = ingredients;
      state.displayIngredients = displayIngredients;
      state.burgerPrice = burgerPrice;
    },

    resetIngredients: (state) => {
      const burgerPrice = 350;
      const ingredients: any = [...state.ingredients];
      ingredients.forEach((el: any) => (el.amount = 0));

      state.ingredients = ingredients;
      state.displayIngredients = [];
      state.burgerPrice = burgerPrice;
    },
  },
});

export const {
  initIngredients,
  addIngredient,
  removeIngredient,
  resetIngredients,
} = customBurgerSlice.actions;

export default customBurgerSlice.reducer;
