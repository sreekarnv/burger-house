import { z } from 'zod';

export const registerInputSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6),
		name: z.string().min(2),
		passwordConfirm: z.string().min(6),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
		path: ['passwordConfirm'],
	});
