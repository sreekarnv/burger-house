const jwt = require("jsonwebtoken");

exports.signToken = async (payload, req, res) => {
	const token = await jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE_TIME * 60 * 60,
	});

	let secure = false;
	// if (process.env.NODE_ENV === "production") {
	// secure = req.secure || req.headers("x-forwarded-proto") === "https";
	// }

	res.cookie("burgerHouse", token, {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 60 * 60 * 1000
		),
		secure,
		httpOnly: true,
	});

	if (process.env.NODE_ENV === "development") {
		return token;
	}

	return;
};

exports.decodeToken = async (token, res) => {
	const payload = await jwt.verify(token, process.env.JWT_SECRET);
	return payload;
};
