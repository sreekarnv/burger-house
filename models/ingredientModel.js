const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Every ingredient must have a nanme'],
        unique: [true, 'ingredient with this name already exists']
    },
    price: {
        type: Number,
        required: [true, 'Every ingredient must have a price'],
    },
    foodType: {
        type: String,
        default: 'none',
        enum: {
            values: ['none', 'vegetarian', 'non-vegetarian'],
            message: 'foodType can only have none , vegetarian, non-vegetarian'
        }
    },
    photo: {
        type: String,
        required: true
    }
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;