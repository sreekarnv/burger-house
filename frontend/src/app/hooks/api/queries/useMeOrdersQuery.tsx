import { Order } from '~@types/orders';
import React from 'react';
import axios from '~app/axios';
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

const getMeOrders = async () => {
	const res = await axios({
		method: 'GET',
		url: '/api/v2/users/me/orders',
	});
	return res.data.data;
};

const useMeOrdersQuery: (
	props: ApiCustomHookProps
) => {
	data: Order[];
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSuccess, onSettled }) => {
	const { replace } = useHistory();
	const { data: orders, error, isLoading } = useQuery(
		'me-orders',
		getMeOrders,
		{
			onSuccess: (data) => {
				if (onSuccess) {
					onSuccess(data);
				}
			},
			onError: (error: any) => {
				replace({
					pathname: '/error',
					state: {
						message: error.response.data.message,
					},
				});

				if (onError) {
					onError(error);
				}
			},
			onSettled: (data, error) => {
				if (onSettled) {
					onSettled(data, error);
				}
			},
		}
	);

	return {
		data: orders,
		error,
		isLoading,
	};
};

export default useMeOrdersQuery;
