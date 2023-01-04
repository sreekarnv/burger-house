import { initTRPC, TRPCError } from '@trpc/server';
import { Cookie } from 'next-cookie';
import superjson from 'superjson';
import { Role } from '../../utils/types/user';
import * as jwt from '../lib/jwt';

import UserModel from '../models/user.model';

import { type Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const parseCookie = t.middleware(async ({ ctx, next }) => {
  const cookie = Cookie.fromApiRoute(ctx.req, ctx.res);
  const token = cookie.get('burgerHouse') as string;

  if (!token) return next();

  const payload = jwt.decodeToken(token) as { _id: string };

  if (!payload) {
    cookie.remove('burgerHouse');
    return next();
  }

  const user = await UserModel.findById(payload._id).select('+password');

  if (!user) return next();

  ctx.user = user;

  return next({ ctx });
});

const protectRoute = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

const adminRoute = t.middleware(async ({ ctx, next }) => {
  if (ctx.user?.role !== Role.Admin) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You are not authorized to perform this action',
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const publicProcedure = t.procedure.use(parseCookie);
export const privateProcedure = t.procedure.use(parseCookie).use(protectRoute);

export const adminProcedure = t.procedure
  .use(parseCookie)
  .use(protectRoute)
  .use(adminRoute);
