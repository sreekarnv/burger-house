import { prop as Property } from '@typegoose/typegoose';

export class Photo {
	@Property({
		type: String,
	})
	url!: string;

	@Property({
		type: String,
		select: false,
	})
	publicId!: string;
}
