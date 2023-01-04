import IngredientModel from '../../models/ingredient.model';

import { router, publicProcedure } from '../trpc';

export const ingredientRouter = router({
  all: publicProcedure.query(async () => {
    return await IngredientModel.find({});
  }),
});
