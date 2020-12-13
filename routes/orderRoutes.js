const express = require("express");
const authController = require("./../controllers/authController");
const orderController = require("../controllers/orderController");
const status = require("./../controllers/_status");

const router = express.Router();

router
	.route("/admin/orderStats")
	.get(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		orderController.getAllOrdersStats
	);

router
	.route("/")
	.get(
		authController.protectRoutes,
		orderController.filterCurrentUserOrders,
		orderController.getAllOrders,
		status.HTTP_200_OK
	)
	.post(
		authController.protectRoutes,
		orderController.placeOrderFields,
		orderController.placeOrder,
		status.HTTP_201_CREATED
	);

router
	.route("/admin")
	.get(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		orderController.getAllOrders,
		status.HTTP_200_OK
	);

router
	.route("/admin/:_id")
	.get(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		orderController.getOrder,
		status.HTTP_200_OK
	)
	.patch(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		orderController.updateOrderAdminFilter,
		orderController.updateOrder,
		status.HTTP_200_OK
	);

router
	.route("/:_id")
	.get(
		authController.protectRoutes,
		orderController.getOrder,
		status.HTTP_200_OK
	)
	.patch(
		authController.protectRoutes,
		orderController.updateOrderUserFilter,
		orderController.updateOrder,
		status.HTTP_200_OK
	);

module.exports = router;
