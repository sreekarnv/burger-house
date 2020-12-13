const multer = require("multer");
const AppError = require("../utils/AppError");
const Ingredient = require("./../models/ingredientModel");
const factory = require("./_factory");

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/ingredients");
	},
	filename: (req, file, cb) => {
		let ext = file.mimetype.split("/")[1];
		if (ext.startsWith("svg")) ext = ext.split("+")[0];
		let name = `ingredient-${req.user._id}-${Date.now()}.${ext}`;
		cb(null, name);
	},
});

const multerFilter = (req, file, cb) => {
	if (
		file.mimetype.startsWith("image") &&
		file.mimetype.split("/")[1] === "svg+xml"
	) {
		cb(null, true);
	} else {
		cb(new AppError("Please only upload svg files", 400), false);
	}
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadIngredientPhoto = upload.single("photo");

exports.filterGetAllIngredients = (req, res, next) => {
	let filter = { ...req.query };

	if (req.query.name) {
		filter = {
			$text: { $search: req.query.name },
		};
		req.query.name = filter;
	}

	if (req.query.foodType) {
		filter = {
			foodType: [req.query.foodType, "none"],
		};
	}

	req.query = filter;
	next();
};

exports.createIngredient = factory.create(Ingredient);
exports.getAllIngredients = factory.getAll(Ingredient);

exports.getIngredient = factory.getOne(Ingredient, {
	msg: "This ingredient does not exist",
	statusCode: 404,
});

exports.updateIngredient = factory.updateOne(Ingredient, {
	msg: "This ingredient does not exist",
	statusCode: 404,
});

exports.deleteIngredient = factory.deleteOne(Ingredient, {
	msg: "This ingredient does not exist",
	statusCode: 404,
});
