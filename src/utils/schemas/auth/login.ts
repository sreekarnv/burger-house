import { z } from 'zod';

export const loginInputSchema = z.object({
  email: z
    .string({ required_error: 'Please provide your email address' })
    .email({ message: 'Please provide a valid email address' }),
  password: z.string({
    required_error: 'Please provide your password',
  }),
});
