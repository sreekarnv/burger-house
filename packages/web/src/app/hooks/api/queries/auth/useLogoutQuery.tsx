import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../../../config/axios';

const useLogoutQuery = () => {
	const { isLoading, error, isFetched } = useQuery('user', async () => {
		await axios({
			url: '/api/v3/users/logout',
		});
		return undefined;
	});

	return { isLoading, error, isFetched };
};

export default useLogoutQuery;
