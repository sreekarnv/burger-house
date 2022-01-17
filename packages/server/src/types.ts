import { NextFunction, Request, Response } from 'express';

export type IRequest = Request & {
	userId?: string;
	photo?: any;
};

export type ExpressResponse = (
	req: IRequest,
	res: Response,
	next: NextFunction
) => any;
