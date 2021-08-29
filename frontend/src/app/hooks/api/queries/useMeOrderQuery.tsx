import * as React from 'react';

import { useQuery, useQueryClient } from 'react-query';

import { Order } from 'src/@types/orders';
import axios from 'src/app/axios';
import { useHistory } from 'react-router';

const getOrder = async (id: string) => {
	const res = await axios({
		method: 'GET',
		url: `/api/v2/users/me/orders/${id}`,
	});
	return res.data.data;
};

const useMeOrderQuery: (id: string) => {
	isLoading: boolean;
	error: any;
	data: Order;
} = (id: string) => {
	const queryClient = useQueryClient();
	const { replace } = useHistory();
	const { isLoading, data, error } = useQuery(
		['me-orders', id],
		() => getOrder(id),
		{
			initialData: () => {
				return queryClient
					.getQueryData<any>('me-orders')
					?.find((order: any) => order._id === id);
			},
			onError: (error: any) => {
				replace({
					pathname: '/error',
					state: {
						message: error.response.data.message,
					},
				});
			},
		}
	);

	return { isLoading, data, error };
};

export default useMeOrderQuery;
