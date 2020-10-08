const express = require('express');
const authController = require('./../controllers/authController');
const ingredientController = require('../controllers/ingredientController')

const router = express.Router();

router.route('/')
    .get(ingredientController.getAllIngredients)
    .post(authController.protectRoutes, authController.restrictRoutes('admin'), ingredientController.uploadPhoto, ingredientController.createIngredient);

router.route('/:id')
    .get(authController.protectRoutes, authController.restrictRoutes('admin'), ingredientController.getIngredient)
    .patch(
        authController.protectRoutes,
        authController.restrictRoutes('admin'),
        ingredientController.uploadPhoto,
        ingredientController.updateIngredient)
    .delete(authController.protectRoutes, authController.restrictRoutes('admin'), ingredientController.deleteIngredient)

module.exports = router;