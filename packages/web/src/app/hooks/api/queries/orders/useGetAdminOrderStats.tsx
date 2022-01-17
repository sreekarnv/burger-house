import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../../../config/axios';

const useGetAdminOrderStats = () => {
	const { data, error, isLoading, isFetched, isFetching } = useQuery<any>(
		'admin-order-stats',
		async () => {
			const res = await axios({
				url: '/api/v3/orders/order-stats',
				method: 'GET',
			});

			return res.data.stats;
		}
	);

	return {
		orderStats: data,
		error,
		isLoading,
		isFetched,
		isFetching,
	};
};

export default useGetAdminOrderStats;
