import * as React from 'react';
import useLoading from './useLoading';

const useDynamicImage = (image: string) => {
	const imageRef = React.useRef<any>();
	const { isLoading, startLoading, stopLoading } = useLoading();

	React.useEffect(() => {
		startLoading();
		if (image.length) {
			fetch(image)
				.then((res) => res.blob())
				.then((blob) => {
					let objectURL = URL.createObjectURL(blob);
					imageRef.current.src = objectURL;
				});
		}
		stopLoading();
	}, [image]);

	return {
		imageRef,
		isLoading,
	};
};

export default useDynamicImage;
