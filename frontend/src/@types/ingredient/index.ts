export type Ingredient = {
	foodType: 'vegetarian' | 'non-vegetarian' | 'none';
	id?: string;
	name: string;
	photo: string;
	photoUrl?: string;
	price: number;
	_id: string;
	amount?: number;
	display?: Display;
	items?: number;
};

type Display = {
	color: string;
	height: number | string;
};
