import * as React from 'react';

import { useMutation, useQueryClient } from 'react-query';

import { Order } from '~@types/orders';
import axios from '~app/axios';
import { useHistory } from 'react-router';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

export const placeOrder = async (data: any) => {
	const res = await axios({
		method: 'POST',
		url: '/api/v2/users/me/orders',
		data,
	});
	return res.data.data;
};

const useCreateOrderMutation: (
	props: ApiCustomHookProps
) => {
	placeOrder: any;
	data: Order;
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSettled, onSuccess }) => {
	const client = useQueryClient();
	const history = useHistory();

	const { mutate, isLoading, data, error } = useMutation(
		(data) => placeOrder(data),
		{
			onSuccess: (data) => {
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
		placeOrder: mutate,
		data,
		isLoading,
		error,
	};
};

export default useCreateOrderMutation;
