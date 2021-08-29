import { Order } from 'src/@types/orders';
import React from 'react';
import axios from 'src/app/axios';
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

const getAdminOrders = async () => {
	const res = await axios({
		method: 'GET',
		url: '/api/v2/orders/admin',
	});
	return res.data.data;
};

const useAdminOrdersQuery: (props: ApiCustomHookProps) => {
	data: Order[];
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSuccess, onSettled }) => {
	const { replace } = useHistory();
	const {
		data: orders,
		error,
		isLoading,
	} = useQuery('admin-orders', getAdminOrders, {
		onSuccess: (data) => {
			if (onSuccess) {
				onSuccess(data);
			}
		},
		onError: (error: any) => {
			if (onError) {
				onError(error);
			}
			if (error.response.status === 403) {
				replace({
					pathname: '/error',
					state: {
						message: error.response.data.message,
					},
				});
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

export default useAdminOrdersQuery;
