const mongoose = require("mongoose");
const slugify = require("slugify");

const burgerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			unique: [true, "burger with this name already exists"],
			required: [true, "burger must have a valid name"],
		},
		price: {
			type: Number,
			required: [true, "burger must have a price"],
		},
		ingredients: [
			{
				ingredient: {
					type: mongoose.Schema.ObjectId,
					ref: "Ingredient",
					required: [true, "ingredient id must be provided"],
				},
				amount: {
					type: Number,
					required: [true, "ingredient must have field amount"],
				},
			},
		],
		isVegetarian: {
			type: Boolean,
			required: [true, "burger must have be vegetarian or non-vegetarian"],
		},
		photo: {
			type: String,
			trim: true,
			default: "burger.jpg",
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		slug: {
			type: String,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

burgerSchema.virtual("photoUrl").get(function () {
	return `/uploads/burgers/${this.photo}`;
});

burgerSchema.index({ name: "text" });

burgerSchema.pre(/^find/, function (next) {
	this.populate("ingredients.ingredient");
	next();
});

burgerSchema.pre("save", function (next) {
	this.slug = slugify(this.name, {
		lowercase: true,
	});
	next();
});

const Burger = mongoose.model("Burger", burgerSchema);

module.exports = Burger;
