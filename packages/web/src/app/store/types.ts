import { Burger } from '@burger-house/models';

export type CartBurger = Burger & {
	itemsInCart: number;
};
