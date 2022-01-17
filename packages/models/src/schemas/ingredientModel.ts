import {
	prop as Property,
	getModelForClass,
	modelOptions,
} from '@typegoose/typegoose';

enum FoodType {
	Vegetarian = 'vegetarian',
	NonVegetarian = 'non-vegetarian',
	None = 'none',
}

class Display {
	@Property({
		default: 1,
	})
	height!: number;

	@Property({
		default: '#ffffff',
	})
	color!: string;
}

@modelOptions({})
export class Ingredient {
	readonly _id!: string;

	@Property({
		trim: true,
		lowercase: true,
		required: [true, 'ingredient must have a valid name'],
	})
	name!: string;

	@Property({
		required: [true, 'ingredient must have a valid price'],
	})
	price!: number;

	@Property({
		enum: FoodType,
		default: FoodType.None,
	})
	foodType!: FoodType;

	@Property({
		default: 'default.jpg',
	})
	photo!: string;

	@Property({ _id: false, default: new Display() })
	display!: Display;
}

const IngredientModel = getModelForClass(Ingredient);

export default IngredientModel;
