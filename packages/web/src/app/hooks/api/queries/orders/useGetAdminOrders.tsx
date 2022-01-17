import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../../../config/axios';
import usePagination from '../../../helpers/usePagination';
import { PaginatedOrders } from '../../types';

const useGetAdminOrders = (limit = 3, initialPage = 1) => {
	const { page, nextPage, previousPage } = usePagination(initialPage);

	const { data, error, isLoading, isFetched, isFetching } =
		useQuery<PaginatedOrders>(
			['admin-orders', page],
			async () => {
				const res = await axios({
					url: '/api/v3/orders',
					method: 'GET',
					params: {
						limit,
						page,
					},
				});

				return res.data.data;
			},
			{
				keepPreviousData: true,
			}
		);

	return {
		data,
		error,
		isLoading,
		isFetched,
		page,
		nextPage,
		previousPage,
		isFetching,
	};
};

export default useGetAdminOrders;
