import * as React from 'react';

import { User } from 'src/@types/user';
import axios from 'src/app/axios';
import { useHistory } from 'react-router';
import { useMutation } from 'react-query';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

export const register = async (data: any) => {
	const res = await axios({
		method: 'POST',
		url: '/api/v2/users/register',
		data,
	});
	return res.data.user;
};

const useRegisterMutation: (props: ApiCustomHookProps) => {
	register: any;
	data: User;
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSettled, onSuccess }) => {
	const history = useHistory();

	const { mutate, isLoading, data, error } = useMutation(
		(data) => register(data),
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

				if (data) {
					setTimeout(() => {
						history.replace('/auth/login');
					}, 1500);
				}
			},
		}
	);

	return {
		register: mutate,
		data,
		isLoading,
		error,
	};
};

export default useRegisterMutation;
