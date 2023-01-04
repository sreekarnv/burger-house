import type { Burger } from '../server/models/burger.model';

export type CartBurger = Burger & {
  itemsInCart: number;
};
