import * as React from 'react';

import { useMutation, useQueryClient } from 'react-query';

import { User } from 'src/@types/user';
import axios from 'src/app/axios';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

export const updateDetails = async (data: any) => {
	const res = await axios({
		method: 'PATCH',
		url: '/api/v2/users/me',
		data,
	});
	return res.data.data;
};

const useUpdateUserDetailsMutation: (props: ApiCustomHookProps) => {
	updateDetails: any;
	data: User;
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSettled, onSuccess }) => {
	const client = useQueryClient();

	const { mutate, isLoading, data, error } = useMutation(
		(data) => updateDetails(data),
		{
			onSuccess: (data) => {
				client.setQueryData('user', data);

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
		updateDetails: mutate,
		data,
		isLoading,
		error,
	};
};

export default useUpdateUserDetailsMutation;
