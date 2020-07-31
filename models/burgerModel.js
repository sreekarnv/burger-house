const mongoose = require('mongoose');
const Ingredient = require('./ingredientModel');
const AppError = require('../errors/AppError');

const burgerSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'All burgers must have a name'],
        trim: true,
    },
    foodType: {
        type: String,
        enum: {
            values: ['vegetarian', 'non-vegetarian'],
            message: 'Diet can either be vegetarian or non-vegetarian'
        },
        required: [true, 'Diet should be included'],
        lowercase: true,
        trim: true,
    },
    ratings: {
        type: Number,
        default: 4,
        min: [1, 'Rating cannot be less than 1'],
        max: [5, 'Rating cannot be greater than 5']
    },
    price: {
        type: Number,
        required: [true, 'All burgers must have a price']
    },
    ingredients: [
        {
            name: {
                type: String,
                required: [true, 'ingredient must have a name'],
            },
            amount: {
                type: Number,
                required: [true, 'ingredients must have amount'],
            }
        }
    ],
    photo: {
        type: String,
        default: 'customBurger.jpg'
    }
});

burgerSchema.pre('save', async function (next) {
    const namePromises = Object.keys(this.ingredients).map(async el => {
        let ingredientsArr = [];
        let ing = await Ingredient.findOne({ name: this.ingredients[el].name.toLowerCase() })

        if (!ing) {
            return next(
                new AppError('Ingredient with this name does not exist', 400)
            );
        }

        let ingObj = {
            _id: ing._id,
            name: ing.name,
            amount: this.ingredients[el].amount
        }

        ingredientsArr.push(ingObj);
        return ingObj
    })

    this.ingredients = await Promise.all(namePromises);
    next()
})

const Burger = mongoose.model('Burger', burgerSchema);

module.exports = Burger;