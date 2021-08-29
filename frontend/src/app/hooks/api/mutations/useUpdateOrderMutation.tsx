import * as React from 'react';

import { useMutation, useQueryClient } from 'react-query';

import { Order } from 'src/@types/orders';
import axios from 'src/app/axios';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

export const updateDetails = async (
	id: string,
	status: 'pending' | 'delivered' | 'cancelled'
) => {
	const res = await axios({
		method: 'PATCH',
		url: `/api/v2/users/me/orders/${id}`,
		data: {
			status: status || 'cancelled',
		},
	});
	return res.data.data;
};

const useUpdateOrderMutation: (props: ApiCustomHookProps) => {
	updateOrderStatus: any;
	data: Order;
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSettled, onSuccess }) => {
	const client = useQueryClient();

	const { mutate, isLoading, data, error } = useMutation(
		({
			id,
			status,
		}: {
			id: string;
			status: 'pending' | 'delivered' | 'cancelled';
		}) => updateDetails(id, status),
		{
			onSuccess: (data) => {
				client.setQueryData(['me-orders', data._id], data);

				if (onSuccess) {
					onSuccess(data);
				}
			},
			onError: (error) => {
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
		updateOrderStatus: mutate,
		data,
		isLoading,
		error,
	};
};

export default useUpdateOrderMutation;
