import * as React from 'react';

const imgTypes = ['webp', 'jpeg', 'jpg', 'png', 'svg+xml'];

const useImageUpload = () => {
	const [error, setError] = React.useState<string | null>();
	const [imagefile, setImageFile] = React.useState<File>();
	const [imageUrl, setImageUrl] = React.useState<string>();

	const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		if (!e.target.files![0]) {
			return setError('please upload an image');
		}

		if (!imgTypes.includes(e.target.files![0].type.split('/')[1])) {
			return setError('please upload images only');
		}

		setImageFile(e.target.files![0]);
		const imageUrl = URL.createObjectURL(e.target.files![0]);
		setImageUrl(imageUrl);
	};

	return {
		error,
		imagefile,
		imageUrl,
		uploadFile,
	};
};

export default useImageUpload;
