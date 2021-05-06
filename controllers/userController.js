const User = require('./../models/userModel');
const factory = require('./_factory');
const sharp = require('sharp');
// const AppError = require("../utils/AppError");
const { MemoryUploadImage } = require('../utils/imageUpload');
// const AppError = require("../utils/AppError");

exports.uploadUserPhoto = MemoryUploadImage.single('photo');

exports.resizeUserImage = async (req, res, next) => {
	if (!req.file) {
		return next();
	}

	req.file.filename = `user-${req.user._id}.${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`uploads/users/${req.file.filename}`);

	next();
};

exports.filterUserUpdateFilter = (req, res, next) => {
	Object.keys(req.body).forEach((el) => {
		if (el === 'password' || el === 'passwordConfirm') {
			delete req.body[el];
		}
	});
	next();
};

exports.updateCurrentUserData = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.photo = req.file.filename;
		}
		const data = await User.findOneAndUpdate(
			{ _id: req.user.id },
			{ ...req.body },
			{
				new: true,
				runValidators: true,
			}
		);

		req.data = data;
		next();
	} catch (err) {
		next(err);
	}
};

exports.getCurrentUserData = async (req, res, next) => {
	const user = req.user;

	res.status(200).json({
		status: 'success',
		user,
	});
};

exports.getAllUsers = factory.getAll(User);

exports.filterUserUpdateBody = (req, res, next) => {
	let body = { ...req.body };
	Object.keys(body).forEach((el) => {
		if (el !== 'role') {
			delete body[el];
		}
	});

	req.body = body;
	next();
};

exports.updateUserRole = factory.updateOne(User, {
	msg: 'this user does not exist',
	statusCode: 404,
});

exports.deleteUser = factory.deleteOne(User, {
	msg: 'this user does not exist',
	statusCode: 404,
});
