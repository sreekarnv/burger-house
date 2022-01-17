import express from 'express';
import { resizeImage } from '../middleware/resizeImage';
import * as authController from './../controllers/authController';
import * as userController from './../controllers/userController';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router
	.route('/me')
	.get(authController.getMe)
	.patch(
		authController.protectRoutes,
		userController.uploadUserPhoto,
		resizeImage('users'),
		userController.updateLoggedInUserDetails
	)
	.delete(authController.protectRoutes, userController.deactivateUser);

router
	.route('/update-password')
	.post(
		authController.protectRoutes,
		authController.updateLoggedInUserPassword
	);

router
	.route('/')
	.get(
		authController.protectRoutes,
		authController.restrictTo('admin'),
		userController.getAllUsers
	);

router.route('/:id').delete(userController.deleteUser);

export default router;
