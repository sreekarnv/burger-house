import { User } from '@burger-house/models';
import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../../../config/axios';

const useGetMeQuery = () => {
	const { data, isLoading, error, isFetched } = useQuery<User>(
		'user',
		async () => {
			const res = await axios({
				url: '/api/v3/users/me',
				method: 'GET',
			});

			return res.data.user;
		}
	);

	return {
		data,
		error,
		isLoading,
		isFetched,
	};
};

export default useGetMeQuery;
