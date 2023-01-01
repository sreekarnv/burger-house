import { z } from 'zod';
import { Status } from '../../types/orders';

export const updateUserOrderStatusSchema = z.object({
	status: z.enum([Status.Cancelled]),
	_id: z.string(),
});
