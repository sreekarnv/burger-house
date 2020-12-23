const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DATABASE =
	"mongodb+srv://<USER>:<PASSWORD>@cluster0.kad9x.mongodb.net/<NAME>?retryWrites=true&w=majority";

const DB = `${DATABASE}`
	.replace("<PASSWORD>", process.env.DB_PASSWORD)
	.replace("<NAME>", process.env.DB_NAME)
	.replace("<USER>", process.env.DB_USER);

// const DB = "mongodb://localhost:27017/burger-house";

mongoose
	.connect(DB, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log(`Connected to DB successfully`))
	.catch((err) =>
		console.log(
			`Error regarding connection with database. Shutting down...`,
			err
		)
	);

const server = app.listen(process.env.PORT, () => {
	console.log(process.env.NODE_ENV);
	console.log(`App running on port ${process.env.PORT}`);
});

// For Unhandeled Rejections
process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION, SHUTTING DOWN......");
	console.log(err);
	server.close(() => {
		process.exit(1);
	});
});

// For Heroku
process.on("SIGTERM", () => {
	console.log("SIGTERM RECEIEVED. Shutting down....");
	server.close(() => {
		console.log("Process terminated...");
	});
});
