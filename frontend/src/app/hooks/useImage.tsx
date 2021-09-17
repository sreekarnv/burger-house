import * as React from 'react';
import useLoading from './useLoading';

const useImage = (image: string) => {
	const imageRef = React.useRef<any>();

	React.useEffect(() => {
		if (image.length) {
			fetch(image)
				.then((res) => res.blob())
				.then((blob) => {
					let objectURL = URL.createObjectURL(blob);
					imageRef.current.src = objectURL;
				});
		}
	}, [image]);

	return {
		imageRef,
	};
};

export default useImage;
