const mongoose = require("mongoose");
const { default: validator } = require("validator");

const ingredientSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			unique: [true, "ingredient with this name already exists"],
			required: [true, "ingredient must have a valid name"],
		},
		price: {
			type: Number,
			required: [true, "ingredient must have a price"],
		},
		foodType: {
			type: String,
			enum: ["vegetarian", "non-vegetarian", "none"],
			default: "none",
		},
		photo: {
			type: String,
			default: "ingredient.jpg",
		},
		display: {
			height: {
				type: Number,
				default: 2,
			},
			color: {
				type: String,
				validate:
					validator.isHexColor || validator.isRgbColor || validator.isHSL,
				required: [true, "ingredient display property must have a valid color"],
			},
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

ingredientSchema.virtual("photoUrl").get(function () {
	return `/uploads/ingredients/${this.photo}`;
});

ingredientSchema.index({ name: "text" });

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
