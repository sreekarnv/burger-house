import { User } from './userModel';
import {
	getModelForClass,
	prop as Property,
	Ref,
	modelOptions,
	pre,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

enum Status {
	Pending = 'pending',
	Cancelled = 'cancelled',
	Delivered = 'delivered',
}

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
	(this as any).sort('-createdAt');
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
	status!: Status;

	@Property({
		type: [OrderItem],
	})
	items!: OrderItem[];

	@Property()
	price!: number;

	readonly createdAt!: Date;

	readonly updatedAt!: Date;
}

const OrderModel = getModelForClass(Order);

export default OrderModel;
