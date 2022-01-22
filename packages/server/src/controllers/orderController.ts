import { OrderModel } from '@burger-house/models';
import { ExpressResponse } from '../types';
import AppError from '../utils/AppError';

// [User] Create Order
export const createOrder: ExpressResponse = async (req, res, next) => {
	try {
		const { items, price } = req.body;

		items.forEach((item: any) => {
			item.photoUrl = item?.photo?.url ?  item.photo.url : `/uploads/burgers/default.svg`;
			item.photo = undefined;
			item._id = undefined;
		});

		const order = await OrderModel.create({
			user: req.userId,
			items,
			price,
		});

		res.status(201).json({
			status: 'success',
			order,
		});
	} catch (err) {
		next(err);
	}
};

// [User] Get All Orders
export const getUserOrders: ExpressResponse = async (req, res, next) => {
	try {
		let { page, limit } = req.query as { page: string; limit: string };

		if (!page || isNaN(parseInt(page))) page = '1';
		if (!limit || isNaN(parseInt(limit))) limit = '1';

		const numPage = parseInt(page);
		const numLimit = parseInt(limit);

		const orders = await OrderModel.find({ user: req.userId })
			.skip((numPage - 1) * numLimit)
			.limit(numLimit + 1);

		res.status(200).json({
			status: 'success',
			results: orders.length - 1,
			data: {
				hasMore: orders.length === numLimit + 1,
				orders: orders.slice(0, numLimit),
			},
		});
	} catch (err) {
		next(err);
	}
};

// [User] Get User Order By Id
export const getUserOrderById: ExpressResponse = async (req, res, next) => {
	try {
		const order = await OrderModel.findOne({
			$and: [{ user: req.userId }, { _id: req.params.id }],
		}).populate('ingredients._id');

		if (!order) {
			return next(new AppError('Order not found', 404));
		}

		res.status(200).json({
			status: 'success',
			order,
		});
	} catch (err) {
		next(err);
	}
};

// [Admin] Get All Orders
export const getAllOrders: ExpressResponse = async (req, res, next) => {
	try {
		let { page, limit } = req.query as { page: string; limit: string };

		if (!page || isNaN(parseInt(page))) page = '1';
		if (!limit || isNaN(parseInt(limit))) limit = '1';

		const numPage = parseInt(page);
		const numLimit = parseInt(limit);

		const orders = await OrderModel.find()
			.skip((numPage - 1) * numLimit)
			.limit(numLimit + 1)
			.populate('user.name user.email');

		res.status(200).json({
			status: 'success',
			results: orders.length - 1,
			data: {
				hasMore: orders.length === numLimit + 1,
				orders: orders.slice(0, numLimit),
			},
		});
	} catch (err) {
		next(err);
	}
};

// [USER] Update Order Status
export const updateUserOrder: ExpressResponse = async (req, res, next) => {
	try {
		const { status } = req.body;

		const order = await OrderModel.findOneAndUpdate(
			{ $and: [{ _id: req.params.id }, { user: req.userId }] },
			{
				$set: { status },
			},
			{ new: true }
		);

		res.status(200).json({
			status: 'success',
			order,
		});
	} catch (err) {
		next(err);
	}
};

// [ADMIN] Update Order Status
export const updateOrderStatus: ExpressResponse = async (req, res, next) => {
	try {
		const { status } = req.body;

		const order = await OrderModel.findByIdAndUpdate(
			req.params.id,
			{
				$set: { status },
			},
			{ new: true }
		).populate('user.name user.email');

		res.status(200).json({
			status: 'success',
			order,
		});
	} catch (err) {
		next(err);
	}
};

// [USER] Get User Order
export const getUserOrder: ExpressResponse = async (req, res, next) => {
	try {
		const order = await OrderModel.findOne({
			$and: [{ _id: req.params.id }, { user: req.userId }],
		}).populate('user', 'name email');

		if (!order) {
			return next(new AppError('This order does not exist', 404));
		}

		res.status(200).json({
			status: 'success',
			order,
		});
	} catch (err) {
		next(err);
	}
};

// [ADMIN] Get Order
export const getOrder: ExpressResponse = async (req, res, next) => {
	try {
		const order = await OrderModel.findById(req.params.id).populate(
			'user',
			'name email'
		);

		if (!order) {
			return next(new AppError('This order does not exist', 404));
		}

		res.status(200).json({
			status: 'success',
			order,
		});
	} catch (err) {
		next(err);
	}
};

// [ADMIN] Order Stats
export const getOrderStats: ExpressResponse = async (req, res, next) => {
	try {
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
			if (!orderStats[0].stats.find((stat: any) => stat._id === status)) {
				orderStats[0].stats.push({
					_id: status,
					count: 0,
				});
			}
		});

		res.status(200).json({
			status: 'success',
			stats: orderStats[0].stats,
		});
	} catch (err) {
		next(err);
	}
};
