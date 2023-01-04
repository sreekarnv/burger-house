import { z } from 'zod';

const itemIngredient = z.object({
  _id: z.string(),
  amount: z.number(),
  name: z.string(),
  photo: z.string(),
});

const itemSchema = z.object({
  itemsInCart: z.number().min(1),
  photoUrl: z.string().nullish(),
  name: z.string(),
  isVegetarian: z.boolean(),
  price: z.number(),
  ingredients: z.array(itemIngredient).nullable(),
});

export const orderInputSchema = z.object({
  items: z.array(itemSchema),
  price: z.number().min(1),
});
