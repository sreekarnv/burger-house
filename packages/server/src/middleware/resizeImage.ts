import { NextFunction, Response } from 'express';
import { IRequest } from '../types';
import AppError from '../utils/AppError';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import path from 'path';
import sharp from 'sharp';

export const resizeImage = (folderName: string) => {
	return async (req: IRequest, _: Response, next: NextFunction) => {
		if (!req.file) {
			return next();
		}

		req.file.filename = `${uuidv4()}.jpeg`;

		try {
			const image = await sharp(req.file.buffer)
				.resize(2000, 2000)
				.toFormat('jpeg')
				.jpeg({ quality: 90 })
				.toBuffer();

			cloudinary.v2.config({
				cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
				api_key: process.env.CLOUDINARY_API_KEY,
				api_secret: process.env.CLOUDINARY_API_SECRET,
			});

			cloudinary.v2.uploader
				.upload_stream(
					{
						resource_type: 'image',
						use_filename: true,
						folder: `burger-house/${folderName}`,
						allowed_formats: ['jpeg'],
					},
					(error, result) => {
						if (error) {
							return next(new AppError(error.message, 500));
						}

						if (result) {
							req.photo = {
								publicId: result.public_id,
								url: result.secure_url,
								name: result.original_filename,
							};

							next();
						}
					}
				)
				.end(image);
		} catch (_) {
			return next(
				new AppError('error uploading your image. Please try later', 400)
			);
		}
	};
};
