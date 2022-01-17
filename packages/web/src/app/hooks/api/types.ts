import { Burger, Order } from '@burger-house/models';

export type PaginatedBurgers = {
	hasMore: boolean;
	burgers: Burger[];
};

export type PaginatedOrders = {
	hasMore: boolean;
	orders: Order[];
};

export type RegisterUserInput = {
	email: string;
	password: string;
	name: string;
	passwordConfirm: string;
	location: { coordinates: [] | [number, number] };
};
