import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../../../config/axios';
import { PaginatedBurgers } from '../../types';

const useGetNewBurgers = () => {
	const { data, error, isLoading, isFetched } = useQuery<PaginatedBurgers>(
		['burgers', 1],
		async () => {
			const res = await axios({
				url: '/api/v3/burgers/new',
				method: 'GET',
			});

			return res.data.data;
		},
		{
			keepPreviousData: true,
		}
	);

	return { data, error, isLoading, isFetched };
};

export default useGetNewBurgers;
