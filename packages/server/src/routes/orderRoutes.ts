import express from 'express';
import * as authController from './../controllers/authController';
import * as orderController from './../controllers/orderController';

const router = express.Router();

// User Routes

router.use(authController.protectRoutes);

router
	.route('/me')
	.post(orderController.createOrder)
	.get(orderController.getUserOrders);

router
	.route('/me/:id')
	.get(orderController.getUserOrder)
	.patch(orderController.updateUserOrder);

// Admin Routes
router.use(authController.restrictTo('admin'));

router.route('/').get(orderController.getAllOrders);

router.route('/order-stats').get(orderController.getOrderStats);

router
	.route('/:id')
	.get(orderController.getOrder)
	.patch(orderController.updateOrderStatus);

export default router;
