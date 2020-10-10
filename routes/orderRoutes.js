const express = require('express');

const authController = require('./../controllers/authController');
const ordersController = require('./../controllers/ordersController');


const router = express.Router()

router.route('/')
    .post(authController.protectRoutes, ordersController.createOrder)
    .get(
        authController.protectRoutes,
        authController.restrictRoutes('admin'),
        ordersController.getAllOrders
    )

router.route('/me')
    .get(
        authController.protectRoutes,
        ordersController.getAllUserOrders
    )

router.route('/:id')
    .get(
        authController.protectRoutes,
        ordersController.getOrder
    )
    .patch(
        authController.protectRoutes,
        ordersController.updateOrder
    )

module.exports = router;