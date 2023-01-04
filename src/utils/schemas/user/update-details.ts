import { z } from 'zod';

export const updateDetailsSchema = z.object({
  email: z
    .string({ required_error: 'Please provide your email address' })
    .email({ message: 'Please provide a valid email address' }),
  name: z.string({ required_error: 'user must provide their name' }),
  photo: z
    .object({
      url: z.string().nullish(),
      publicId: z.string().nullish(),
    })
    .nullable(),
});
