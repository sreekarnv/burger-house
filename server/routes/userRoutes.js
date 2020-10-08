const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.get('/verifyAccount/:id', authController.verifyUserEmail);

router.get('/checkAuth', authController.checkIsLoggedIn);

router.get('/logout', authController.LogoutUsers);

router.route('/me')
    .patch(
        authController.protectRoutes,
        userController.uploadUserPhoto,
        userController.resizeUserPhoto,
        userController.updateCurrentUserData
    )
    .get(
        authController.protectRoutes,
        userController.getCurrentUserData
    )
    .delete(
        authController.protectRoutes,
        userController.deleteCurrentUser
    )


router.route('/updateCurrentUserPassword')
    .patch(authController.protectRoutes,
        authController.updateCurrentUserPassword)

router.route('/register')
    .post(authController.RegisterUsers)

router.route('/login')
    .post(authController.LoginUsers);


router.route('/')
    .get(authController.protectRoutes, authController.restrictRoutes('admin'), userController.getAllUsers);

router.route('/:id')
    .get(authController.protectRoutes, authController.restrictRoutes('admin'), userController.getUser)
    .patch(authController.protectRoutes, authController.restrictRoutes('admin'), userController.updateUser)
    .delete(authController.protectRoutes, authController.restrictRoutes('admin'), userController.deleteUser)

module.exports = router;