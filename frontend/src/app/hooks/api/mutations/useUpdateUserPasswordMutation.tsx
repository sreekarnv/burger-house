import * as React from 'react';

import { User } from '~@types/user';
import axios from '~app/axios';
import { useMutation } from 'react-query';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

export const updatePassword = async (data: any) => {
	const res = await axios({
		method: 'POST',
		url: '/api/v2/users/updateCurrentUserPassword',
		data,
	});
	return res.data.user;
};

const useUpdateUserPasswordMutation: (
	props: ApiCustomHookProps
) => {
	updatePassword: any;
	data: User;
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSettled, onSuccess }) => {
	const { mutate, isLoading, data, error } = useMutation(
		(data) => updatePassword(data),
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
		updatePassword: mutate,
		data,
		isLoading,
		error,
	};
};

export default useUpdateUserPasswordMutation;
