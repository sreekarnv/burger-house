import { z } from 'zod';
import { Status } from '../../types/orders';

export const updateOrderStatusSchema = z.object({
	status: z.enum([Status.Delivered, Status.Pending]),
	_id: z.string(),
});
