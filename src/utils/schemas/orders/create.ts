import { z } from 'zod';
import { Ingredient } from '../../../server/models/ingredient.model';

const itemSchema = z.object({
	itemsInCart: z.number().min(1),
	photoUrl: z.string().nullish(),
	name: z.string(),
	isVegetarian: z.boolean(),
	price: z.number(),
	ingredients: z.array(z.instanceof(Ingredient)).nullable(),
});

export const orderInputSchema = z.object({
	items: z.array(itemSchema),
	price: z.number().min(1),
});
