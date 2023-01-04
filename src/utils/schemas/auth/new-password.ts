import { z } from 'zod';

export const updatePasswordFormSchema = z.object({
  oldPassword: z.string({ required_error: 'user must provide a password' }),
  password: z
    .string({ required_error: 'user must provide a password' })
    .min(6, 'password must contain atleast 6 characters'),
  passwordConfirm: z
    .string({ required_error: 'user must confirm their password' })
    .min(6),
});

export const updatePasswordSchema = updatePasswordFormSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  }
);
