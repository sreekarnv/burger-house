const express = require("express");
const authController = require("./../controllers/authController");
const ingredientController = require("../controllers/ingredientController");
const status = require("./../controllers/_status");

const router = express.Router();

router
	.route("/")
	.get(
		ingredientController.filterGetAllIngredients,
		ingredientController.getAllIngredients,
		status.HTTP_200_OK
	)
	.post(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		ingredientController.createIngredient,
		status.HTTP_201_CREATED
	);

router
	.route("/:_id")
	.get(ingredientController.getIngredient, status.HTTP_200_OK)
	.patch(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		ingredientController.uploadIngredientPhoto,
		ingredientController.updateIngredient,
		status.HTTP_200_OK
	)
	.delete(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		ingredientController.deleteIngredient,
		status.HTTP_204_NO_CONTENT
	);

module.exports = router;
