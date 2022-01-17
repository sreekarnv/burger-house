import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IRequest } from '../types';

export const signToken = (payload: any, req: IRequest, res: Response) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET!, {
		expiresIn: parseInt(process.env.JWT_EXPIRE_TIME!) * 60 * 60,
	});

	let secure = false;
	if (process.env.NODE_ENV === 'production') {
		secure =
			req.secure || (req as any).headers('x-forwarded-proto') === 'https';
	}

	res.cookie('burgerHouse', token, {
		expires: new Date(
			Date.now() +
				parseInt(process.env.JWT_COOKIE_EXPIRE_TIME!) * 60 * 60 * 1000
		),
		secure,
		sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
		httpOnly: true,
	});
};

export const decodeToken = (token: string, res: Response) => {
	const payload = jwt.verify(token, process.env.JWT_SECRET!);
	return payload;
};
