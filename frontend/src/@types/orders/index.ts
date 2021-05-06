import { Burger } from '~@types/burger';
import { User } from '~@types/user';

export type Order = {
	_id: string;
	createdAt: Date | string | number;
	status: 'delivered' | 'pending' | 'cancelled';
	price: number;
	items: Burger[];
	user: User;
};
