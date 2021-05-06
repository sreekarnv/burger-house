const AppError = require('../utils/AppError');

exports.updateOne = (Model, errObj) => {
	return async (req, res, next) => {
		try {
			if (req.file) {
				req.body.photo = req.file.filename;
			}

			const data = await Model.findOneAndUpdate(
				{ ...req.params },
				{ ...req.body },
				{
					new: true,
					runValidators: true,
				}
			);

			if (!data) {
				return next(new AppError(errObj.msg, errObj.statusCode));
			}

			req.data = data;
			next();
		} catch (err) {
			next(err);
		}
	};
};

exports.create = (Model) => {
	return async (req, _, next) => {
		try {
			const data = await Model.create(req.body);
			req.data = data;
			next();
		} catch (err) {
			next(err);
		}
	};
};

exports.getAll = (Model) => {
	return async (req, res, next) => {
		try {
			const data = await Model.find(req.query).sort(req.sort).limit(req.limit);
			req.data = data;
			next();
		} catch (err) {
			next(err);
		}
	};
};

exports.getOne = (Model, errObj) => {
	return async (req, res, next) => {
		try {
			const data = await Model.findOne({ ...req.params });

			if (!data) {
				return next(new AppError(errObj.msg, errObj.statusCode));
			}

			req.data = data;
			next();
		} catch (err) {
			next(err);
		}
	};
};

exports.deleteOne = (Model, errObj) => {
	return async (req, res, next) => {
		try {
			const data = await Model.findOneAndDelete({ ...req.params });

			if (!data) {
				return next(new AppError(errObj.msg, errObj.statusCode));
			}

			next();
		} catch (err) {
			next(err);
		}
	};
};
