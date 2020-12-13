const multer = require("multer");
const AppError = require("../utils/AppError");

const multerMemoryStorage = multer.memoryStorage();

exports.multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("please upload images only", 400), false);
	}
};

exports.MemoryUploadImage = multer({
	storage: multerMemoryStorage,
	fileFilter: this.multerFilter,
});
