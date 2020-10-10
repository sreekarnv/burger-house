const Burger = require('./../models/burgerModel');
const AppError = require('./../errors/AppError');
const multer = require('multer');
const sharp = require('sharp');


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

exports.uploadBurgerPhoto = upload.single('photo');

exports.resizeBurgerPhoto = async (req, res, next) => {
    try {
        if (!req.file) return next();

        req.file.filename = `burger-${req.user.id}-${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
            .resize(1500, 1500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`uploads/burgers/${req.file.filename}`);

        next();
    } catch (err) {
        next(err);
    }
};

exports.createBurger = async (req, res, next) => {
    try {
        let ingredients = JSON.parse(req.body.ingredients)
        req.body.ingredients = ingredients;

        if (req.file) req.body.photo = req.file.filename;

        const burger = await Burger.create(req.body);


        res.status(201).json({
            status: 'success',
            burger
        })

    } catch (err) {
        next(err);
    }
}


exports.getAllBurgers = async (req, res, next) => {
    try {
        let queryObj = {};
        if (req.query.foodType) {
            queryObj = { foodType: req.query.foodType }
        }

        const burgers = await Burger.find(queryObj);

        res.status(200).json({
            status: 'success',
            result: burgers.length,
            burgers
        })
    } catch (err) {
        next(err);
    }
}

exports.getBurger = async (req, res, next) => {
    try {
        const burger = await Burger.findById(req.params.id);

        if (!burger) {
            const message = 'Could not find the specified burger';
            return next(new AppError(message, 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                burger
            }
        })

    } catch (err) {
        next(err);
    }
}

exports.updateBurger = async (req, res, next) => {
    try {
        if (req.file) req.body.photo = req.file.filename;

        const burger = await Burger.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true, new: true
        });

        if (!burger) {
            const message = 'Could not find the specified burger';
            return next(
                new AppError(message, 404)
            );
        }

        res.status(200).json({
            status: 'success',
            data: {
                burger
            }
        })
    } catch (err) {
        next(err);
    }
}


exports.deleteBurger = async (req, res) => {
    try {
        const burger = await Burger.findByIdAndDelete(req.params.id)

        if (!burger) {
            const message = 'Could not find the specified burger';
            return next(new AppError(message, 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        next(err);
    }
}
