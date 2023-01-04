import mongoose from 'mongoose';
import {
  prop as Property,
  modelOptions,
  getModelForClass,
  index,
  pre,
  ReturnModelType,
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import slugify from 'slugify';
import { Ingredient } from './ingredient.model';
import { Photo } from './photo.model';

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
    toJSON: {
      versionKey: false,
    },
  },
})
@pre<Burger>('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
})
@pre<Burger>(/^find/, async function (next) {
  this.sort('-createdAt').populate('ingredients.ingredient', 'name photo');

  next();
})
@index({ name: 'text' })
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

const BurgerModel = (mongoose.models.Burger ||
  getModelForClass(Burger)) as ReturnModelType<typeof Burger, {}>;

// const BurgerModel = getModelForClass(Burger);

export default BurgerModel;
