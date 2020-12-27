const AppError = require('../utils/AppError');
const Order = require('./../models/orderModel');
const factory = require('./_factory');

exports.placeOrderFields = (req, res, next) => {
	if (!req.body.user) {
		req.body.user = req.user._id;
	}

	next();
};

exports.placeOrder = factory.create(Order);

exports.getAllOrders = factory.getAll(Order);

exports.filterCurrentUserOrders = async (req, res, next) => {
	req.query.user = req.user.id;
	next();
};

exports.getOrder = factory.getOne(Order, {
	msg: 'this order does not exist',
	statusCode: 404,
});

exports.updateOrder = factory.updateOne(Order, {
	msg: 'this order does not exist',
	statusCode: 404,
});

exports.updateOrderUserFilter = (req, res, next) => {
	let body = { ...req.body };
	Object.keys(body).map((el) => {
		if (el !== 'status') {
			delete body[el];
		}
	});
	req.body.status = 'cancelled';
	req.body = body;
	next();
};

exports.updateOrderAdminFilter = (req, res, next) => {
	let body = { ...req.body };
	if (!req.body.status) {
		return next(new AppError('can only update status which is missing', 404));
	}
	Object.keys(body).map((el) => {
		if (el !== 'status') {
			delete body[el];
		}
	});
	req.body = body;
	next();
};

exports.getAllOrdersStats = async (req, res, next) => {
	try {
		const pendingOrders = await Order.aggregate([
			{ $match: { status: 'pending' } },
			{
				$group: {
					_id: '$status',
					total: { $sum: 1 },
					price: { $sum: '$price' },
				},
			},
		]);

		const delieverdOrders = await Order.aggregate([
			{ $match: { status: 'delivered' } },
			{
				$group: {
					_id: '$status',
					total: { $sum: 1 },
					price: { $sum: '$price' },
				},
			},
		]);

		const cancelledOrders = await Order.aggregate([
			{ $match: { status: 'cancelled' } },
			{
				$group: {
					_id: '$status',
					total: { $sum: 1 },
					price: { $sum: '$price' },
				},
			},
		]);

		const orderStats = {
			pending: pendingOrders,
			delivered: delieverdOrders,
			cancelled: cancelledOrders,
		};

		req.orderStats = orderStats;

		res.status(200).json({
			status: 'success',
			orderStats,
		});
	} catch (err) {
		next(err);
	}
};
