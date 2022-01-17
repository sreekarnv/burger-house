import { signToken } from './../utils/jwt';
import { UserModel } from '@burger-house/models';
import { ExpressResponse, IRequest } from '../types';
import AppError from '../utils/AppError';
import { NextFunction, Response } from 'express';

export const registerUser: ExpressResponse = async (req, res, next) => {
	try {
		const { name, email, password, passwordConfirm, location } = req.body;

		if (!location || !location.coordinates.length) {
			return next(new AppError('users must provide their location', 422));
		}

		const user = await UserModel.create({
			name,
			email,
			password,
			passwordConfirm,
			location,
			photo: {
				publicId: '',
				url: '/uploads/users/default.jpg',
			},
		});

		user.password = undefined as any;

		res.status(201).json({
			status: 'success',
			user,
		});
	} catch (err: any) {
		err.collection = 'user';
		next(err);
	}
};

export const loginUser: ExpressResponse = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email }).select('+password');

		if (!user || !(await user.checkPassword(password, user.password))) {
			return next(new AppError('Invalid credentials', 401));
		}

		user.password = undefined as any;

		signToken({ _id: user._id }, req, res);

		res.status(200).json({
			status: 'success',
			user,
		});
	} catch (err) {
		next(err);
	}
};

export const logoutUser: ExpressResponse = async (req, res, next) => {
	let secure = false;
	if (process.env.NODE_ENV === 'production') {
		secure =
			req.secure || (req as any).headers('x-forwarded-proto') === 'https';
	}

	res.clearCookie('burgerHouse', {
		sameSite: 'none',
		secure,
		httpOnly: true,
	});

	res.status(200).json({
		status: 'success',
		user: null,
	});
};

export const getMe: ExpressResponse = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			res.status(200).json({
				status: 'success',
				user: null,
			});
			return;
		}

		res.status(200).json({
			status: 'success',
			user,
		});
	} catch (err) {
		res.status(200).json({
			status: 'success',
			user: null,
		});
	}
};

export const protectRoutes: ExpressResponse = async (req, res, next) => {
	const userId = req.userId;

	const userExists = userId && (await UserModel.findById(userId).count());

	if (!userExists) {
		return next(
			new AppError('You are not logged in. Please login to continue', 401)
		);
	}

	next();
};

export const restrictTo = (role: 'user' | 'admin') => {
	return async (req: IRequest, res: Response, next: NextFunction) => {
		const user = await UserModel.findById(req.userId);

		if (user!.role !== role) {
			return next(
				new AppError('You do not have permission to perform this action', 403)
			);
		}

		next();
	};
};

export const updateLoggedInUserPassword: ExpressResponse = async (
	req,
	res,
	next
) => {
	try {
		let id = req.userId;

		const { currentPassword, password, passwordConfirm } = req.body;

		if (password !== passwordConfirm) {
			return next(new AppError('Passwords do not match', 422));
		}

		const user = await UserModel.findById(id).select('+password');

		if (!user) {
			return next(new AppError('User not found', 404));
		}

		if (!(await user.checkPassword(currentPassword, user.password))) {
			return next(new AppError('invalid password', 400));
		}

		user.password = await user.hashPassword(password);

		await user.save({
			validateBeforeSave: false,
		});

		user.password = undefined as any;

		res.status(200).json({
			status: 'success',
			user,
		});
	} catch (error) {
		next(error);
	}
};
