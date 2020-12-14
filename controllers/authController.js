const User = require("./../models/userModel");
const AppError = require("./../utils/AppError");
const sendEmail = require("./../utils/sendEmail");
const { signToken, decodeToken } = require("./../utils/jwt");

// send verify email

const sendVerificationEmail = async (req, user) => {
	const verificationUrl = `
	${req.protocol}://${req.get("host")}/verify-user/${user.userVerificationToken}
	`;

	const message = `Please activate your account by going to: ${verificationUrl}`;

	await sendEmail({
		email: user.email,
		subject: "Please verify your email",
		message,
	});
};

/////////////////////////////////////////////////////
// register user
exports.registerUser = async (req, res, next) => {
	try {
		const { name, email, password, passwordConfirm, location } = req.body;

		if (!location || !location.coordinates.length) {
			return next(new AppError("users must provide their location", 400));
		}

		const user = await User.create({
			name,
			email,
			password,
			passwordConfirm,
			location,
		});

		user.hideSensitiveData(user);

		// let token = await signToken({ id: user._id }, req, res);

		await sendVerificationEmail(req, user);

		res.status(201).json({
			// token,
			status: "success",
			user,
		});
	} catch (err) {
		next(err);
	}
};

///////////////////////////////////////////////////////
// login user

exports.loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return next(new AppError("please enter your credentials", 400));
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.checkPassword(password, user.password))) {
			return next(new AppError("invalid credentials", 400));
		}

		if (!user.isVerified) {
			return next(new AppError("Please verify your email address", 401));
		}

		let token = await signToken({ id: user._id }, req, res);

		user.hideSensitiveData(user);

		res.status(200).json({
			// token,
			status: "success",
			user,
		});
	} catch (err) {
		next(err);
	}
};

/////////////////////////////////////////////////////////////////////
// Logout User

exports.logoutUsers = async (req, res, next) => {
	try {
		res.cookie("burgerHouse", null, {
			expires: new Date(Date.now()),
			secure: false,
			httpOnly: true,
		});

		res.status(200).json({
			status: "success",
			user: null,
		});
	} catch (err) {
		next(err);
	}
};

/////////////////////////////////////////////////////////////////////
// Protect Api routes

exports.protectRoutes = async (req, res, next) => {
	try {
		let authToken;
		if (req.cookies.burgerHouse) {
			authToken = req.cookies.burgerHouse;
		} else if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			authToken = req.headers.authorization.split(" ")[1];
		}

		const { id, iat, exp } = await decodeToken(authToken);

		const user = await User.findById(id).select("+passwordChangedAt");

		if (!user || !user.checkJwtExpires(iat, exp)) {
			return next(
				new AppError("you are not authorized. please login to continue", 401)
			);
		}

		if (user.checkPasswordChangedAt(iat, exp, user.passwordChangedAt)) {
			return next(
				new AppError(
					"you recently changed your password. please login to continue",
					401
				)
			);
		}

		user.hideSensitiveData(user);

		req.user = user;

		next();
	} catch (err) {
		next(err);
	}
};

/////////////////////////////////////////////////////////////////////
// restrict routes based on roles

exports.restrictTo = (role) => {
	return (req, res, next) => {
		const user = req.user;

		if (user.role !== role) {
			return next(
				new AppError("you are not authorized to perform this action", 403)
			);
		}

		next();
	};
};

/////////////////////////////////////////////////////////////////////
// Check if user is logged in

const noUser = (req, res, next) => {
	res.status(200).json({
		status: "success",
		user: null,
	});
};

exports.checkIsLoggedIn = async (req, res, next) => {
	try {
		// 1. get Authtoken and check if it exists
		let token = req.cookies.burgerHouse;

		if (!token) {
			return noUser(req, res, next);
		}

		// 2. Verfiy and get decoded values
		const { id } = await decodeToken(token);

		// 3. Get User and check if user exists
		const user = await User.findById(id);

		if (!user) {
			return noUser(req, res, next);
		}

		user.hideSensitiveData(user);

		// 5. Grant access
		res.status(200).json({
			status: "success",
			user,
		});
	} catch (err) {
		next();
	}
};

/////////////////////////////////////////////////////////////////////
// Update Current User Password

exports.updateUserPassword = async (req, res, next) => {
	try {
		let id = req.user.id;

		const { currentPassword, password, passwordConfirm } = req.body;

		const user = await User.findById(id).select("+password");

		if (!(await user.checkPassword(currentPassword, user.password))) {
			return next(new AppError("invalid password", 400));
		}

		user.password = password;
		user.passwordConfirm = passwordConfirm;
		await user.save();

		user.hideSensitiveData(user);

		res.status(200).json({
			status: "success",
			user,
		});
	} catch (err) {
		next(err);
	}
};

/////////////////////////////////////////////////////////////////////

exports.sendUserVerification = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ isVerified: false, email });

		if (!user) {
			return next(new AppError("Please enter a valid email", 400));
		}

		await sendVerificationEmail(req, user);

		res.status(200).json({
			status: "success",
			message: "Email Sent...",
		});
	} catch (err) {
		next(err);
	}
};

exports.verifyUserEmail = async (req, res, next) => {
	try {
		const user = await User.findOneAndUpdate(
			{ userVerificationToken: req.params.id, isVerified: false },
			{ isVerified: true, userVerificationToken: undefined },
			{ runValidators: true, new: true }
		);

		if (!user) {
			return next();
		}

		res.status(200).json({
			status: "success",
			verified: user.isVerified,
		});
	} catch (err) {
		next(err);
	}
};
