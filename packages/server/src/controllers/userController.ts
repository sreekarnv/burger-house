import { UserModel } from '@burger-house/models';
import { ExpressResponse } from '../types';
import AppError from '../utils/AppError';
import imageUpload from '../utils/imageUpload';

export const uploadUserPhoto = imageUpload.single('photo');

export const deleteUser: ExpressResponse = async (req, res, next) => {
	try {
		const user = await UserModel.findByIdAndDelete(req.params.id);

		if (!user) {
			return next(new AppError('User not found', 404));
		}

		res.status(204).json({
			status: 'success',
			user: null,
		});
	} catch (err) {
		next(err);
	}
};

export const getAllUsers: ExpressResponse = async (req, res, next) => {
	try {
		const users = await UserModel.find();

		res.status(200).json({
			status: 'success',
			results: users.length,
			users,
		});
	} catch (err) {
		next(err);
	}
};

export const deactivateUser: ExpressResponse = async (req, res, next) => {
	try {
		const user = await UserModel.findByIdAndUpdate(
			req.userId!,
			{
				$set: {
					isActive: false,
				},
			},
			{
				new: true,
			}
		);

		res.status(200).json({
			status: 'success',
			user,
		});
	} catch (err) {
		next(err);
	}
};

export const updateLoggedInUserDetails: ExpressResponse = async (
	req,
	res,
	next
) => {
	try {
		if (req.photo) {
			req.body.photo = {
				publicId: req.photo.publicId,
				url: req.photo.url,
			};
		}

		Object.keys(req.body).forEach((el) => {
			if (el === 'password' || el === 'passwordConfirm' || el === 'role') {
				delete req.body[el];
			}
		});

		const data = await UserModel.findOneAndUpdate(
			{ _id: req.userId },
			{ ...req.body },
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			status: 'success',
			data,
		});
	} catch (err) {
		next(err);
	}
};
