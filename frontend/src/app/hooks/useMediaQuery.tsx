import * as React from 'react';

const useMediaQuery = (query: string) => {
	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		if (window.matchMedia(query).matches) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, []);

	window.addEventListener('resize', () => {
		if (window.matchMedia(query).matches) {
			setShow(true);
		} else {
			setShow(false);
		}
	});

	return {
		show,
	};
};

export default useMediaQuery;
