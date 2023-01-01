import { loginInputSchema } from './../../../utils/schemas/auth/login';
import { registerSchema } from '../../../utils/schemas/auth/register';
import * as jwt from '../../lib/jwt';
import UserModel from '../../models/user.model';
import { Cookie } from 'next-cookie';

import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
	register: publicProcedure
		.input(registerSchema)
		.mutation(async ({ input, ctx }) => {
			const { name, email, password } = input;
			const user = await UserModel.create({
				name,
				email,
				password,
				location: input.location,
			});

			await jwt.signToken({ user }, ctx.req, ctx.res);

			return user;
		}),
	login: publicProcedure
		.input(loginInputSchema)
		.mutation(async ({ input, ctx }) => {
			const { email, password } = input;

			const user = await UserModel.findOne({
				email,
			}).select('+password');

			if (!user || !(await user.checkPassword(password, user.password))) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Invalid Credentials',
				});
			}

			await jwt.signToken({ user }, ctx.req, ctx.res);

			return user;
		}),
	logout: publicProcedure.mutation(async ({ ctx }) => {
		const cookie = Cookie.fromApiRoute(ctx.req, ctx.res);
		cookie.remove('burgerHouse');
		return true;
	}),
	user: publicProcedure.query(async ({ ctx }) => {
		return ctx.user || null;
	}),
});
