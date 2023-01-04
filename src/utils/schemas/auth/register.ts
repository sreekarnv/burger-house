import { z } from 'zod';

export const registerInputSchema = z.object({
  email: z
    .string({ required_error: 'user must provide their email' })
    .email({ message: 'please provide a valid email' }),
  password: z
    .string({ required_error: 'user must provide a password' })
    .min(6, 'password must contain atleast 6 characters'),
  name: z.string({ required_error: 'user must provide their name' }),
  passwordConfirm: z
    .string({ required_error: 'user must confirm their password' })
    .min(6),
});

export const registerFormSchema = registerInputSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  }
);

export const registerLocationSchema = z.object({
  location: z
    .object({
      coordinates: z.array(z.number()).nonempty(),
    })
    .required({ coordinates: true }),
});

export const registerSchema = registerLocationSchema.merge(registerInputSchema);
