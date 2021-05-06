import { Ingredient } from '~@types/ingredient';

export type BurgerIngredient = {
	amount: number;
	ingredient: Ingredient;
};

export type OrderIngredient = {
	_id: string;
	items: number;
	name: string;
};

export type Burger = {
	_id?: string;
	name?: string;
	id?: string;
	photo?: string;
	photoUrl?: string;
	price: number;
	slug?: string;
	createdAt?: Date | string | number;
	ingredients: OrderIngredient[] & BurgerIngredient[];
	isVegetarian: boolean;
	itemsInCart?: number;
};
