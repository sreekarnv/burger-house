const express = require("express");
const authController = require("./../controllers/authController");
const burgerController = require("./../controllers/burgerController");
const status = require("./../controllers/_status");

const router = express.Router();

router
	.route("/")
	.get(
		burgerController.filterGetAllBurgers,
		burgerController.getAllBurgers,
		status.HTTP_200_OK
	)
	.post(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		burgerController.uploadBurgerPhoto,
		burgerController.createBurger,
		status.HTTP_201_CREATED
	);

router.get(
	"/get-new-burgers",
	burgerController.getNewBurgers,
	burgerController.filterGetAllBurgers,
	burgerController.getAllBurgers,
	status.HTTP_200_OK
);

router
	.route("/:slug")
	.get(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		burgerController.getBurger,
		status.HTTP_200_OK
	)
	.patch(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		burgerController.uploadBurgerPhoto,
		burgerController.resizeBurgerPhoto,
		burgerController.parseIngredientsArray,
		burgerController.updateBurger,
		status.HTTP_200_OK
	)
	.delete(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		burgerController.deleteBurger,
		status.HTTP_204_NO_CONTENT
	);

module.exports = router;
