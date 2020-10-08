const Ingredient = require('./../models/ingredientModel');
const multer = require('multer');
const AppError = require('../errors/AppError');


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/ingredients`)
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const ext = file.mimetype.split('/')[1].split('+')[0];
        cb(null, `ingredient-${name}-${Date.now()}.${ext}`)
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/svg+xml')) {
        cb(null, true);
    } else {
        cb(new AppError(
            'Not an SVG Image. Please upload only images of type .svg', 400
        ), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadPhoto = upload.single('photo');

exports.getAllIngredients = async (req, res, next) => {
    try {
        const ing = await Ingredient.find();

        res.status(200).json({
            status: 'success',
            results: ing.length,
            // data: {
            ingredients: ing
            // }
        })


    } catch (err) {
        next(err);
    }
}

exports.createIngredient = async (req, res, next) => {
    try {
        if (req.file) req.body.photo = req.file.filename;

        const ingredient = await Ingredient.create(req.body);

        res.status(201).json({
            status: 'success',
            ingredient
        })


    } catch (err) {
        next(err);
    }
}


exports.getIngredient = async (req, res, next) => {
    try {
        const ing = await Ingredient.findById(req.params.id);

        if (!ing) {
            return new AppError('This ingredient does not exist', 404)
        }

        res.status(200).json({
            status: 'success',
            // data: {
            ingredient: ing
            // }
        })


    } catch (err) {
        next(err);
    }
}

exports.updateIngredient = async (req, res, next) => {
    try {

        if (req.file) req.body.photo = req.file.filename;

        const ing = await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        });

        if (!ing) {
            return new AppError('This ingredient does not exist', 404)
        }

        res.status(200).json({
            status: 'success',
            // data: {
            ingredient: ing
            // }
        })


    } catch (err) {
        next(err);
    }
}

exports.deleteIngredient = async (req, res, next) => {
    try {

        const ing = await Ingredient.findByIdAndDelete(req.params.id);

        if (!ing) {
            return new AppError('This ingredient does not exist', 404)
        }

        res.status(204).json({
            status: 'success',
            data: null
        })


    } catch (err) {
        next(err);
    }
}