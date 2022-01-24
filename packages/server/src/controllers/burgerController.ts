import { BurgerModel } from '@burger-house/models';
import { ExpressResponse } from '../types';
import imageUpload from '../utils/imageUpload';
import cloudinary from 'cloudinary';

export const getNewBurgers: ExpressResponse = async (req, res, next) => {
	try {
		const burgers = await BurgerModel.find().sort({ createdAt: -1 }).limit(3);

		res.status(200).json({
			status: 'success',
			data: {
				burgers,
				hasMore: true,
			},
		});
	} catch (err) {
		next(err);
	}
};

export const getAllBurgers: ExpressResponse = async (req, res, next) => {
	try {
		let { page, limit, search } = req.query as {
			page: string;
			limit: string;
			search?: string;
		};

		let query: any = {};

		if (search) {
			query.$text = { $search: search };
		}

		if (!page || isNaN(parseInt(page))) page = '1';
		if (!limit || isNaN(parseInt(limit))) limit = '6';

		const numPage = parseInt(page);
		const numLimit = parseInt(limit);

		const burgers = await BurgerModel.find(query)
			.skip((numPage - 1) * numLimit)
			.limit(numLimit + 1);

		res.status(200).json({
			status: 'success',
			results: burgers.slice(0, numLimit).length,
			data: {
				hasMore: burgers.length === numLimit + 1,
				burgers: burgers.slice(0, numLimit),
			},
		});
	} catch (err) {
		next(err);
	}
};

export const uploadBurgerPhoto = imageUpload.single('photo');

export const createBurger: ExpressResponse = async (req, res, next) => {
	try {
		const photo = req.photo ? req.photo : undefined;

		const { name, isVegetarian, price, ingredients } = req.body;

		const burger = await BurgerModel.create({
			name,
			isVegetarian,
			price,
			ingredients,
			photo: {
				publicId: photo ? photo.publicId : undefined,
				url: photo ? photo.url : undefined,
			},
		});

		res.status(201).json({
			status: 'success',
			burger,
		});
	} catch (err: any) {
		err.collection = 'burger';
		cloudinary.v2.uploader.destroy(req.photo.publicId);

		next(err);
	}
};
