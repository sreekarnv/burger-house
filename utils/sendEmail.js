const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},

		// host: process.env.EMAIL_HOST,
		// port: process.env.EMAIL_PORT,
		// auth: {
		// 	user: process.env.EMAIL_USERNAME,
		// 	pass: process.env.EMAIL_PASSWORD,
		// },
	});

	const mailOptions = {
		from: "BurgerHouse <burgerhouse@email.com>",
		to: options.email,
		subject: options.subject,
		text: options.message,
	};

	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
