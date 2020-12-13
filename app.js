const express = require("express");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");

const app = express();

app.enable("trust proxy");

app.use(cors());

app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);
app.use(cookieParser());

const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests fromt this IP, please try again in an hour",
});

app.use("/api", limiter);

// API Routes
const ingredientRoutes = require("./routes/ingredientRoutes");
const userRoutes = require("./routes/userRoutes");
const burgerRoutes = require("./routes/burgerRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());

// errorHandler
const errorController = require("./controllers/errorController");

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// setting https headers
app.use(cookieParser());

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "frontend/build")));

app.use(
	"/uploads/burgers",
	express.static(path.join(__dirname, "uploads", "burgers"))
);

app.use(
	"/uploads/ingredients",
	express.static(path.join(__dirname, "uploads", "ingredients"))
);

app.use(
	"/uploads/users",
	express.static(path.join(__dirname, "uploads", "users"))
);

app.use("/api/v2/ingredients", ingredientRoutes);
app.use("/api/v2/users", userRoutes);
app.use("/api/v2/burgers", burgerRoutes);
app.use("/api/v2/orders", orderRoutes);

// cleaning malicious Data against NoSQL query injections
app.use(mongoSanitize());

// cleaning malicious Data aganinst XSS
app.use(xss());

// react
app.use((req, res, next) => {
	res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
});

app.use(errorController);

module.exports = app;
