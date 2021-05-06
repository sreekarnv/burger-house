export type User = {
	role?: 'customer' | 'admin';
	photo: string;
	isActive?: boolean;
	_id: string;
	isVerified?: boolean;
	name: string;
	email: string;
	photoUrl?: string;
	id?: string;
	location?: any;
};
