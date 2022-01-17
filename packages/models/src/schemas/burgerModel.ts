import mongoose from 'mongoose';
import {
	prop as Property,
	modelOptions,
	getModelForClass,
	index,
	pre,
	Ref,
} from '@typegoose/typegoose';
import slugify from 'slugify';
import { Ingredient } from './ingredientModel';
import { Photo } from './photoModel';

export class BurgerIngredient {
	@Property({
		type: mongoose.SchemaTypes.ObjectId,
		ref: () => Ingredient,
	})
	ingredient!: Ref<Ingredient>;

	@Property()
	amount!: number;
}

@modelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
@pre<Burger>('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
})
@pre<Burger>(/^find/, async function (next) {
	(this as any).sort('-createdAt').populate('ingredients.ingredient', 'name');

	next();
})
@index<Burger>({ name: 'text' })
export class Burger {
	readonly _id!: string;

	@Property({
		trim: true,
		lowercase: true,
		unique: true,
		required: [true, 'burger must have a valid name'],
	})
	name!: string;

	@Property({
		required: [true, 'burger must have a valid price'],
	})
	price!: number;

	@Property({ _id: false, type: [BurgerIngredient] })
	ingredients!: BurgerIngredient[];

	@Property({})
	isVegetarian!: boolean;

	@Property({
		type: Photo,
	})
	photo!: Photo;

	@Property()
	slug!: string;
}

const BurgerModel = getModelForClass(Burger);

export default BurgerModel;
