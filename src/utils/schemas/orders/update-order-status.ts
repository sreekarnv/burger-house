import { z } from 'zod';
import { Status } from '../../types/orders';

export const updateOrderStatusSchema = z.object({
  status: z.enum([Status.Delivered, Status.Pending, Status.Cancelled]),
  _id: z.string(),
});
