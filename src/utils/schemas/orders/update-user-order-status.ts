import { z } from 'zod';
import { Status } from '../../types/orders';

export const updateUserOrderStatusSchema = z.object({
  status: z.enum([Status.Cancelled, Status.Delivered]),
  _id: z.string(),
});
