import express from 'express';
import * as ingredientController from './../controllers/ingredientController';
import * as authController from '../controllers/authController';

const router = express.Router();

router
	.route('/')
	.get(ingredientController.getAllIngredients)
	.post(
		authController.protectRoutes,
		authController.restrictTo('admin'),
		ingredientController.createIngredient
	);

export default router;
