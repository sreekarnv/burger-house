import { decodeToken } from './../utils/jwt';
import { ExpressResponse } from '../types';

export const parseJwt: ExpressResponse = (req, res, next) => {
	const token = req.cookies.burgerHouse;

	if (token) {
		const payload = decodeToken(token, res) as any;

		console.log({ token, payload });

		if (payload) {
			req.userId = payload._id;
		}
	}

	next();
};
