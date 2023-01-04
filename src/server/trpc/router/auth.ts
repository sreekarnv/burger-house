import { updateDetailsSchema } from './../../../utils/schemas/user/update-details';
import { loginInputSchema } from './../../../utils/schemas/auth/login';
import { registerSchema } from '../../../utils/schemas/auth/register';
import * as jwt from '../../lib/jwt';
import UserModel from '../../models/user.model';
import { Cookie } from 'next-cookie';

import { router, publicProcedure, privateProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { updatePasswordSchema } from '../../../utils/schemas/auth/new-password';

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
        photo: {
          publicId: 'default',
          url: '/users/default.jpg',
        },
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
  details: privateProcedure
    .input(updateDetailsSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, email, photo } = input;

      const user = await UserModel.findByIdAndUpdate(
        ctx.user?._id,
        { email, name, photo },
        {
          new: true,
          runValidators: true,
        }
      );

      return user;
    }),
  newPassword: privateProcedure
    .input(updatePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const { password, oldPassword } = input;

      const user = await UserModel.findById(ctx.user?._id).select('+password');

      if (!user || !(await user.checkPassword(oldPassword, user.password))) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid Credentials',
        });
      }

      if (!user) return false;

      user.password = password;

      await user.save({ validateBeforeSave: false });

      return true;
    }),
});
