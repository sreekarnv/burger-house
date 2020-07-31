const User = require('./../models/userModel');
const AppError = require('../errors/AppError');
const multer = require('multer');
const sharp = require('sharp');
const Order = require('../models/orderModel');



const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError(
            'Not an Image. Please upload only images', 400
        ), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
    try {
        if (!req.file) return next();

        req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(1500, 1500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/users/${req.file.filename}`);

        next();
    } catch (err) {
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        let filter = null;
        if (req.query) filter = { ...req.query };

        if (req.query.name) filter = { ...req.query, name: new RegExp(`${req.query.name}`, 'g') }

        const users = await User.find(filter)
        res.status(200).json({
            status: 'success',
            results: users.length,
            users

        })
    } catch (err) {
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new AppError('User with specified id does not exist', 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })

    } catch (err) {
        next(err);
    }
}


exports.updateUser = async (req, res, next) => {
    try {
        const { role } = req.body;


        if (req.user._id !== req.params.id && role === 'customer') {
            return next(
                new AppError('Cannot make an Admin to a customer', 400)
            )
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true, new: true
        })

        if (!user) {
            return next(new AppError('User with specified id does not exist', 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })

    } catch (err) {
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return next(new AppError('User with specified id does not exist', 404))
        }

        res.status(204).json({
            status: 'success',
            data: null
        })

    } catch (err) {
        next(err);
    }
}

exports.getCurrentUserData = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return next(
                new AppError('You are not logged in', 401)
            )
        }

        res.status(200).json({
            status: 'success',
            user
        })


    } catch (err) {
        next(err);
    }
}

exports.updateCurrentUserData = async (req, res, next) => {
    try {
        // 1. get updated data (payload)
        const payload = {};
        Object.keys(req.body).forEach(field => {
            if (field === 'name' || field === 'email') payload[field] = req.body[field];
        })

        if (req.file) payload['photo'] = req.file.filename;

        // 2. update user
        user = await User.findByIdAndUpdate(req.user.id, payload, {
            new: true, runValidators: true
        })

        // 3. check if user exists
        if (!user) {
            return next(new AppError('User does not exist', 404))
        }

        res.status(200).json({
            status: 'success',
            user
        })
    } catch (err) {
        next(err);
    }
}

exports.deleteCurrentUser = async (req, res, next) => {
    try {
        // 1. get auth token
        const user = req.user

        const orders = await Order.find({ user: user.id })

        let pendingOrders = [];
        orders.map(el => {
            if (el.status === 'pending') {
                pendingOrders.push(el);
            }
            pendingOrders;
        })


        if (pendingOrders.length > 0) {
            return next(
                new AppError('You still have pending orders. You can delete your account after your orders have been delivered', 400)
            );
        };

        await User.findByIdAndDelete(user.id)

        res.status(204).json({
            status: 'success',
            data: null
        });

    } catch (err) {
        next(err);
    }
}