const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: [true, "every order must belong to a user"],
	},
	price: {
		type: Number,
		required: [true, "every order must have a total price"],
	},
	items: [
		{
			name: {
				type: String,
				default: "custom burger",
			},
			price: {
				type: Number,
				required: [true, "every burger must have a price"],
			},
			ingredients: [
				{
					name: {
						type: String,
						trim: true,
						lowercase: true,
					},
					items: {
						type: Number,
					},
				},
			],
			isVegetarian: {
				type: Boolean,
			},
			itemsInCart: {
				type: Number,
			},
			photoUrl: {
				type: String,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	status: {
		type: String,
		enum: ["pending", "cancelled", "delivered"],
		default: "pending",
	},
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
