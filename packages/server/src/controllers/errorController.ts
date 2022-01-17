import { NextFunction, Response } from 'express';
import { IRequest } from '../types';

const sendDuplicateKeyError = (err: any) => {
	let error = { ...err };
	error.statusCode = 422;
	const errors: any = [];
	const fields = Object.keys(error.keyValue);

	fields.forEach((field) => {
		errors.push({
			field,
			message: `${err.collection} with ${field} already exists`,
		});
	});

	error.errors = errors;

	return error;
};

const sendValidationError = (err: any) => {
	let errors = Object.keys(err.errors).map((field) =>
		err.errors[field].properties[0]
			? { field, message: `${err.errors[field].properties[0]}` }
			: { field, message: `${err.errors[field].properties.message}` }
	);
	console.log('message', err.message);
	err.errors = errors;
	err.statusCode = 422;
	err.message = err._message;
	err._message = undefined;
	return err;
};

const errorController = (
	err: any,
	req: IRequest,
	res: Response,
	next: NextFunction
) => {
	console.log('----------------------------------\n');
	console.log(err);
	console.log('----------------------------------\n');

	let error = err;

	if (err.name === 'ValidationError') {
		error = sendValidationError(err);
	}

	if (err.code === 11000) {
		error = sendDuplicateKeyError(err);
	}

	res.status(error.statusCode ?? 500).json({
		status:
			error.status || `${error.statusCode}`.startsWith('4')
				? 'fail'
				: 'error' || 'error',
		error: process.env.NODE_ENV === 'development' ? error : undefined,
		message: error.message,
		errors: error.errors,
	});
};

export default errorController;
