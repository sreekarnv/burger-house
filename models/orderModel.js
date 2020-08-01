const mongoose = require('mongoose');
const { json } = require('body-parser');


const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        price: {
            type: Number,
        },
        menuOrders: [
            {
                _id: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Burger',
                },
                items: {
                    type: Number
                }
            },
        ],
        customOrders: [
            {
                name: {
                    type: String,
                },
                value: {
                    type: Number
                },
                price: {
                    type: Number
                },
                ingredients: [
                    {
                        _id: {
                            type: mongoose.Schema.ObjectId,
                            ref: 'Ingredient'
                        },
                        amount: {
                            type: Number
                        }
                    }
                ],
                photo: {
                    type: String,
                    default: `customBurger.jpg`
                },
                foodType: {
                    type: String,
                    enum: {
                        values: ['vegetarian', 'non-vegetarian'],
                        message: 'Can only have values vegetarian and non-vegetarian'
                    }
                },
                items: {
                    type: String,
                }
            }
        ],
        status: {
            type: String,
            enum: {
                values: ['pending', 'delivered', 'cancelled'],
                message: 'Status can only have values pending delivered and cancelled'
            },
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
    },
    // {
    //     toJSON: {virtuals: true}
    //     to
    // }
)

// orderSchema.virtual('_id', {
//     ref: 'Burger',
//     localField: 'menuOrders._id',
//     foreignField: '_id'
// });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;