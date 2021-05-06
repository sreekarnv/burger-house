import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import useLoading from './useLoading';

const useRoute = (
	type: 'not-protected' | 'protected' = 'not-protected',
	to?: string
) => {
	const { isLoading, startLoading, stopLoading } = useLoading();
	const queryClient = useQueryClient();
	const history = useHistory();
	const location = useLocation();
	const user = queryClient.getQueryData('user');

	React.useEffect(() => {
		startLoading();
		if ((type === 'not-protected' && !user) || (type === 'protected' && user)) {
			history.replace(location.pathname);
		} else {
			to ? history.replace(to) : history.replace('/error');
		}
		stopLoading();
	}, [user]);

	return { isLoading };
};

export default useRoute;
