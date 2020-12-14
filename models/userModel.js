const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
const { default: validator } = require("validator");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			lowercase: true,
			required: [true, "user must provide their name"],
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: [true, "user with this email already exists"],
			required: [true, "user must provide their email id"],
			validate: [validator.isEmail, "please provide a valid email id"],
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, "users must have a password"],
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, "users must confirm their password"],
			validate: [
				function (el) {
					return this.password === el;
				},
				"passwords do not match",
			],
		},
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
		photo: {
			type: String,
			default: "default.jpg",
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		passwordChangedAt: {
			type: Date,
		},
		location: {
			type: {
				type: String,
				default: "Point",
				enum: ["Point"],
			},
			coordinates: {
				type: [Number],
				required: [true, "users must provide their location"],
			},
		},
		// isVerified: {
		// 	type: Boolean,
		// 	default: false,
		// },
		// userVerificationToken: {
		// 	type: String,
		// },
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
);

userSchema.virtual("photoUrl").get(function () {
	return `uploads/users/${this.photo}`;
});

userSchema.pre(/^find/, async function (next) {
	this.find({ isActive: true });
	next();
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

// userSchema.pre("save", async function (next) {
// 	if (!this.isNew) return next();

// 	this.userVerificationToken = crypto.randomBytes(32).toString("hex");
// 	next();
// });

userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1500;
	next();
});

// userSchema.methods.createUserVerificationToken = function () {
// 	const verificationToken = crypto.randomBytes(32).toString("hex");
// 	this.userVerificationToken = crypto
// 		.createHash("sha256")
// 		.update(verificationToken)
// 		.digest("hex");
// 	return verificationToken;
// };

userSchema.methods.checkPassword = async function (
	enteredPassword,
	dbPassword
) {
	return await bcrypt.compare(enteredPassword, dbPassword);
};

userSchema.methods.checkJwtExpires = function (issuedAt, expiresAt) {
	return expiresAt * 1000 > Date.now() && issuedAt * 1000 < Date.now();
};

userSchema.methods.checkPasswordChangedAt = function (
	issuedAt,
	expiresAt,
	passwordChangedAt
) {
	const passwordChangedAtTime = new Date(passwordChangedAt).getTime();
	return (
		issuedAt * 1000 < passwordChangedAtTime &&
		expiresAt * 1000 > passwordChangedAtTime
	);
};

userSchema.methods.hideSensitiveData = function (user) {
	user.password = undefined;
	user.passwordConfirm = undefined;
	user.passwordChangedAt = undefined;
	user.__v = undefined;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
