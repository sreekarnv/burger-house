const express = require('express');

const burgerController = require('./../controllers/burgerController');
const authController = require('./../controllers/authController');



const router = express.Router();

// router.route('/popularBurgers')
//     .get(burgerController.getPopularBurgers)

router.route('/')
    .get(burgerController.getAllBurgers)
    .post(
        authController.protectRoutes,
        authController.restrictRoutes('admin'),
        burgerController.uploadBurgerPhoto,
        burgerController.resizeBurgerPhoto,
        burgerController.createBurger
    );

router.route('/:id')
    .patch(
        authController.protectRoutes,
        authController.restrictRoutes('admin'),
        burgerController.uploadBurgerPhoto,
        burgerController.resizeBurgerPhoto,
        burgerController.updateBurger
    )
    .delete(authController.protectRoutes, authController.restrictRoutes('admin'), burgerController.deleteBurger)
    .get(authController.protectRoutes, authController.restrictRoutes('admin'), burgerController.getBurger);

module.exports = router;


