import { router } from '../trpc';
import { authRouter } from './auth';
import { burgerRouter } from './burger';
import { ingredientRouter } from './ingredient';
import { orderRouter } from './order';

export const appRouter = router({
	auth: authRouter,
	ingredient: ingredientRouter,
	burger: burgerRouter,
	order: orderRouter,
});

export type AppRouter = typeof appRouter;
