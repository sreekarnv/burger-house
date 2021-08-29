import * as React from 'react';

import axios from 'src/app/axios';
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

const getOrders = async () => {
	const res = await axios({
		method: 'GET',
		url: '/api/v2/orders/admin/orderStats',
	});
	return res.data.orderStats;
};

const useAdminOrderstatsQuery: (props: ApiCustomHookProps) => {
	data: any;
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSuccess, onSettled }) => {
	const { replace } = useHistory();
	const {
		data: orders,
		error,
		isLoading,
	} = useQuery('order-admin-stats', getOrders, {
		onSuccess: (data) => {
			if (onSuccess) {
				onSuccess(data);
			}
		},
		onError: (error: any) => {
			if (error.response.status === 403) {
				replace({
					pathname: '/error',
					state: {
						message: error.response.data.message,
					},
				});
			}
			if (onError) {
				onError(error);
			}
		},
		onSettled: (data, error) => {
			if (onSettled) {
				onSettled(data, error);
			}
		},
	});

	return {
		data: orders,
		error,
		isLoading,
	};
};

export default useAdminOrderstatsQuery;
