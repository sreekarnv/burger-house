import * as React from 'react';

const useLoading = (init: boolean = false) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(init);

	const startLoading = () => setIsLoading(true);
	const stopLoading = () => setIsLoading(false);

	return {
		isLoading,
		startLoading,
		stopLoading,
	};
};

export default useLoading;
