const Burger = require('./../models/burgerModel');
const { MemoryUploadImage } = require('./../utils/imageUpload');
const sharp = require('sharp');
const factory = require('./_factory');

exports.uploadBurgerPhoto = MemoryUploadImage.single('photo');

exports.resizeBurgerPhoto = async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `burger-${req.user._id}-${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(250, 250)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`uploads/burgers/${req.file.filename}`);

	next();
};

exports.createBurger = factory.create(Burger);

// Filter
exports.filterGetAllBurgers = (req, res, next) => {
	let filter = { ...req.query };
	const excludedFields = ['limit', 'sort'];

	excludedFields.forEach((el) => {
		if (filter[el]) {
			delete filter[el];
		}
	});

	if (req.query.sort) {
		req.sort = req.query.sort;
	}

	if (req.query.limit) {
		req.limit = req.query.limit;
	}

	if (req.query.name) {
		filter = {
			$text: { $search: req.query.name },
		};
		req.query.name = filter;
	}

	if (req.query.isVegetarian && req.query.name) {
		filter = { ...filter, isVegetarian: req.query.isVegetarian };
	}

	req.query = filter;
	next();
};

exports.getAllBurgers = factory.getAll(Burger);

exports.getBurger = factory.getOne(Burger, {
	msg: 'this burger does not exist',
	statusCode: 404,
});

exports.parseIngredientsArray = (req, res, next) => {
	if (req.body.ingredients) {
		req.body.ingredients = JSON.parse(req.body.ingredients);
	}

	next();
};

exports.updateBurger = factory.updateOne(Burger, {
	msg: 'this burger does not exist',
	statusCode: 404,
});

exports.deleteBurger = factory.deleteOne(Burger, {
	msg: 'this burger does not exist',
	statusCode: 404,
});

exports.getNewBurgers = async (req, res, next) => {
	req.query = { limit: 3, sort: '-createdAt' };
	next();
};
