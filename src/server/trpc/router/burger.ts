import { FilterQuery } from 'mongoose';
import { z } from 'zod';
import BurgerModel, { Burger } from '../../models/burger.model';

import { router, publicProcedure } from '../trpc';

export const burgerRouter = router({
  all: publicProcedure
    .input(
      z.object({
        page: z.number().nullish(),
        limit: z.number().nullish(),
        search: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      let { page, limit } = input;
      const { search } = input;

      const query = {} as FilterQuery<Burger>;

      if (search) {
        query.$text = { $search: search };
      }

      if (!page) page = 1;
      if (!limit) limit = 6;

      const burgers = await BurgerModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit + 1);

      return {
        hasMore: burgers.length === limit + 1,
        burgers: burgers.slice(0, limit),
      };
    }),
});
