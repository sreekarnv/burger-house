import express from 'express';
import { resizeImage } from '../middleware/resizeImage';
import * as authController from './../controllers/authController';
import * as burgerController from './../controllers/burgerController';

const router = express.Router();

router.get('/new', burgerController.getNewBurgers);

router
	.route('/')
	.get(burgerController.getAllBurgers)
	.post(
		authController.protectRoutes,
		authController.restrictTo('admin'),
		burgerController.uploadBurgerPhoto,
		resizeImage('burgers'),
		burgerController.createBurger
	);

export default router;
