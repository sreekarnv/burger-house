import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { connectDB } from '../lib/mongoose';
import { User } from '../models/user.model';

export const createContext = async (opts: CreateNextContextOptions) => {
  await connectDB();

  return {
    req: opts.req,
    res: opts.res,
    user: null as User | null,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
