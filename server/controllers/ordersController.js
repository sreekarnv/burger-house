const Order = require('./../models/orderModel');
const AppError = require('../errors/AppError');

exports.createOrder = async (req, res, next) => {
    try {

        let { menuOrders, customOrders, user, price } = req.body;
        if (!user) user = req.user

        const createdAt = new Date(Date.now());
        console.log(createdAt);
        const order = await Order.create({
            menuOrders, customOrders, user, price, createdAt
        })

        res.status(201).json({
            status: 'success',
            order
        })

    } catch (err) {
        next(err);
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
        let filter = { status: req.query.status };
        if (req.query.status === undefined) filter = {}

        const orders = await Order.find({ ...filter })
            .populate('user')
            .populate({ path: 'menuOrders', populate: { path: '_id' } })
            .populate({ path: 'customOrders', populate: { path: 'ingredients', populate: { path: '_id' } } })

        res.status(200).json({
            status: 'success',
            orders
        })

    } catch (err) {
        next(err);
    }
}


exports.getAllUserOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('user')
            .populate({ path: 'menuOrders', populate: { path: '_id' } })
            .populate({ path: 'customOrders', populate: { path: 'ingredients', populate: { path: '_id' } } });

        res.status(200).json({
            status: 'success',
            orders
        })

    } catch (err) {
        next(err);
    }
}


exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user')
            .populate({ path: 'menuOrders', populate: { path: '_id' } })
            .populate({ path: 'customOrders', populate: { path: 'ingredients', populate: { path: '_id' } } });

        if (!order) {
            return next(new AppError('Order with this id does not exist', 404))
        }

        res.status(200).json({
            status: 'success',
            order
        })

    } catch (err) {
        next(err);
    }
}



exports.updateOrder = async (req, res, next) => {
    try {

        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(req.params.id, { status }, {
            runValidators: true, new: true
        });

        if (!order) {
            return next(new AppError('Order with this id does not exist', 404))
        }

        res.status(200).json({
            status: 'success',
            order
        })

    } catch (err) {
        next(err);
    }
}
