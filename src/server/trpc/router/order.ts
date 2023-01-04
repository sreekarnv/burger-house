import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { orderInputSchema } from '../../../utils/schemas/orders/create';
import { updateOrderStatusSchema } from '../../../utils/schemas/orders/update-order-status';
import { updateUserOrderStatusSchema } from '../../../utils/schemas/orders/update-user-order-status';
import OrderModel from '../../models/order.model';

import { router, privateProcedure, adminProcedure } from '../trpc';

export const orderRouter = router({
  // User
  create: privateProcedure
    .input(orderInputSchema)
    .mutation(async ({ input, ctx }) => {
      const { items } = input;
      const { price } = input;

      items.forEach((item) => {
        item.photoUrl = item.photoUrl ?? `/uploads/burgers/default.svg`;
      });

      const order = await OrderModel.create({
        user: ctx.user._id,
        items,
        price,
      });

      return order;
    }),
  userAll: privateProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        limit: z.number().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      let { cursor: page, limit } = input;

      if (!page) page = 1;
      if (!limit) limit = 10;

      const orders = await OrderModel.find({ user: ctx.user._id })
        .skip((page - 1) * limit)
        .limit(limit + 1);

      return {
        hasMore: orders.length === limit + 1,
        orders: orders.slice(0, limit),
      };
    }),
  userOneById: privateProcedure
    .input(z.object({ _id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { _id } = input;

      const order = await OrderModel.findOne({
        $and: [{ user: ctx.user._id }, { _id }],
      });

      if (!order) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Order not found',
        });
      }

      return order;
    }),

  userUpdateStatus: privateProcedure
    .input(updateUserOrderStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const { status, _id } = input;

      const order = await OrderModel.findOneAndUpdate(
        { $and: [{ _id }, { user: ctx.user._id }] },
        {
          $set: { status },
        },
        { new: true }
      );

      if (!order) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Order not found',
        });
      }

      return order;
    }),

  // Admin

  all: adminProcedure
    .input(
      z.object({
        page: z.number().nullish(),
        limit: z.number().nullish(),
      })
    )
    .query(async ({ input }) => {
      let { page, limit } = input;

      if (!page) page = 1;
      if (!limit) limit = 6;

      const orders = await OrderModel.find()
        .skip((page - 1) * limit)
        .limit(limit + 1)
        .populate('user.name user.email');

      return {
        hasMore: orders.length === limit + 1,
        orders: orders.slice(0, limit),
      };
    }),

  oneById: adminProcedure
    .input(z.object({ _id: z.string() }))
    .query(async ({ input }) => {
      const order = await OrderModel.findById(input._id).populate(
        'user',
        'name email'
      );

      if (!order) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'This order does not exist',
        });
      }

      return order;
    }),

  orderStats: adminProcedure.query(async () => {
    const orderStats = await OrderModel.aggregate([
      {
        $facet: {
          stats: [
            {
              $group: {
                _id: '$status',
                count: {
                  $sum: 1,
                },
              },
            },
          ],
          total: [
            {
              $count: 'count',
            },
          ],
        },
      },
      {
        $unwind: { path: '$total' },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$$ROOT',
              {
                stats: {
                  $concatArrays: [
                    [{ _id: 'total', count: '$$ROOT.total.count' }],
                    '$$ROOT.stats',
                  ],
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          total: 0,
        },
      },
    ]);

    ['pending', 'delivered', 'cancelled'].forEach((status) => {
      if (
        !orderStats[0].stats.find(
          (stat: { _id: string; count: number }) => stat._id === status
        )
      ) {
        orderStats[0].stats.push({
          _id: status,
          count: 0,
        });
      }
    });

    return orderStats[0].stats;
  }),

  updateOrderStatus: adminProcedure
    .input(updateOrderStatusSchema)
    .mutation(async ({ input }) => {
      const { _id, status } = input;

      const order = await OrderModel.findByIdAndUpdate(
        _id,
        {
          $set: { status },
        },
        { new: true }
      ).populate('user', 'name email');

      if (!order) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'This order does not exist',
        });
      }

      return order;
    }),
});
