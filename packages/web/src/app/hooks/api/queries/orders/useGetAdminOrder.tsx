import { Order } from '@burger-house/models';
import React from 'react';
import { useQuery } from 'react-query';
import { axios } from '../../../../config/axios';

const useGetAdminOrder = (_id: string) => {
	const { data, error, status, isLoading, isFetched } = useQuery<Order>(
		['admin-order', _id],
		async () => {
			const res = await axios({
				url: `/api/v3/orders/${_id}`,
				method: 'GET',
			});

			return res.data.order;
		}
	);

	return { data, error, status, isLoading, isFetched };
};

export default useGetAdminOrder;
