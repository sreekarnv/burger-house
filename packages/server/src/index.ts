import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import errorController from './controllers/errorController';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import { parseJwt } from './middleware/parseJwt';
import burgerRoutes from './routes/burgerRoutes';
import ingredientRoutes from './routes/ingredientRoutes';
import orderRoutes from './routes/orderRoutes';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.enable('trust proxy');

app.use(morgan('dev'));

app.use(
	cors({
		credentials: true,
		origin: process.env.CORS_ORIGIN,
	})
);

app.use(
	helmet({
		crossOriginResourcePolicy: {
			policy: 'cross-origin',
		},
		hidePoweredBy: true,
	})
);

app.use(cookieParser());

app.use(parseJwt);

app.use(express.json());

const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests fromt this IP, please try again in an hour',
});

app.use('/api', limiter);

(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI!);
		console.log('[LOG]: Connected to MongoDB');
		mongoose.set('debug', true);

		app.use(
			'/uploads/ingredients',
			express.static(path.join(__dirname, '../uploads', 'ingredients'))
		);

		app.use(
			'/uploads/users',
			express.static(path.join(__dirname, '../uploads', 'users'))
		);

		app.use(
			'/uploads/burgers',
			express.static(path.join(__dirname, '../uploads', 'burgers'))
		);

		app.use('/api/v3/users', userRoutes);
		app.use('/api/v3/burgers', burgerRoutes);
		app.use('/api/v3/ingredients', ingredientRoutes);
		app.use('/api/v3/orders', orderRoutes);

		app.use(mongoSanitize());

		app.use(xss());

		app.use(errorController);

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error: any) {
		console.log(error);
		mongoose.disconnect().then(() => {
			process.exit(1);
		});
	}
})();
