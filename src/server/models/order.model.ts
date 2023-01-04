import { User } from './user.model';
import {
  getModelForClass,
  prop as Property,
  modelOptions,
  pre,
  ReturnModelType,
} from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { Status } from '../../utils/types/orders';

export class OrderItemIngredient {
  readonly _id!: string;

  @Property()
  name!: string;

  @Property()
  amount!: number;
}

export class OrderItem {
  @Property({
    trim: true,
    required: [true, 'order item must have a valid name'],
  })
  name!: string;

  @Property({
    required: [true, 'order item must have a valid price'],
  })
  price!: number;

  @Property()
  photoUrl!: string;

  @Property()
  isVegetarian!: boolean;

  @Property()
  itemsInCart!: number;

  @Property({
    type: [OrderItemIngredient],
    default: [],
  })
  ingredients!: OrderItemIngredient[];
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@pre<Order>(/^find/, function (next) {
  this.sort('-createdAt');
  next();
})
export class Order {
  readonly _id!: string;

  @Property({
    type: mongoose.SchemaTypes.ObjectId,
    ref: () => User,
  })
  user!: Ref<User>;

  @Property({
    enum: Status,
    default: Status.Pending,
  })
  status!: string;

  @Property({
    type: [OrderItem],
  })
  items!: OrderItem[];

  @Property()
  price!: number;

  readonly createdAt!: Date;

  readonly updatedAt!: Date;
}

const OrderModel = (mongoose.models.Order ||
  getModelForClass(Order)) as ReturnModelType<typeof Order, {}>;

// const OrderModel = getModelForClass(Order);

export default OrderModel;
