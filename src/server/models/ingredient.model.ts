import type { ReturnModelType } from '@typegoose/typegoose';
import {
  prop as Property,
  getModelForClass,
  modelOptions,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { FoodType } from '../../utils/types/ingredients';

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

@modelOptions({
  schemaOptions: {
    toJSON: {
      versionKey: false,
      transform(_, ret) {
        ret.photo = `/ingredients/${ret.photo}`;
      },
    },
  },
})
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
  foodType!: string;

  @Property({
    default: 'default.jpg',
  })
  photo!: string;

  @Property({ _id: false, default: new Display() })
  display!: Display;
}

const IngredientModel = (mongoose.models.Ingredient ||
  getModelForClass(Ingredient)) as ReturnModelType<typeof Ingredient, {}>;

// const IngredientModel = getModelForClass(Ingredient);

export default IngredientModel;
