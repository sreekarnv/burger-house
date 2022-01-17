import { IngredientModel } from '@burger-house/models';
import { ExpressResponse } from '../types';

export const getAllIngredients: ExpressResponse = async (req, res, next) => {
	try {
		const ingredients = await IngredientModel.find();

		res.status(200).json({
			status: 'success',
			results: ingredients.length,
			ingredients,
		});
	} catch (err) {
		next(err);
	}
};

export const createIngredient: ExpressResponse = async (req, res, next) => {
	try {
		const { name, price, display } = req.body;
		const ingredient = await IngredientModel.create({
			name,
			price,
			display,
		});

		res.status(201).json({
			status: 'success',
			data: ingredient,
		});
	} catch (err: any) {
		err.collection = 'ingredient';
		next(err);
	}
};
