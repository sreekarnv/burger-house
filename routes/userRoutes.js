const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const orderRouter = require("./orderRoutes");
const status = require("./../controllers/_status");

const router = express.Router();

// router.get("/verifyAccount/:id", authController.verifyUserEmail);

// router.post("/sendUserVerification", authController.sendUserVerification);

router.get("/checkAuth", authController.checkIsLoggedIn);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUsers);

router.use("/me/orders", orderRouter);

router
	.route("/me")
	.get(authController.protectRoutes, userController.getCurrentUserData)
	.patch(
		authController.protectRoutes,
		userController.uploadUserPhoto,
		userController.resizeUserImage,
		userController.updateCurrentUserData,
		status.HTTP_200_OK
	);

router
	.route("/updateCurrentUserPassword")
	.post(
		authController.protectRoutes,
		authController.updateUserPassword,
		status.HTTP_200_OK
	);

router
	.route("/")
	.get(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		userController.getAllUsers,
		status.HTTP_200_OK
	);

router
	.route("/:_id")
	.patch(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		userController.filterUserUpdateBody,
		userController.updateUserRole,
		status.HTTP_200_OK
	)
	.delete(
		authController.protectRoutes,
		authController.restrictTo("admin"),
		userController.deleteUser,
		status.HTTP_204_NO_CONTENT
	);

module.exports = router;
