import multer, { FileFilterCallback } from 'multer';
import { IRequest } from '../types';
import AppError from './AppError';

const storageMem = multer.memoryStorage();

const multerFilter = (req: IRequest, file: any, cb: FileFilterCallback) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('please upload images only', 400) as any, false);
	}
};

export default multer({
	storage: storageMem,
	fileFilter: multerFilter,
});
