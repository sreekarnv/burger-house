import * as React from 'react';

import { useMutation, useQueryClient } from 'react-query';

import { User } from '~@types/user';
import axios from '~app/axios';
import { useHistory } from 'react-router';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

export const login = async (data: any) => {
	const res = await axios({
		method: 'POST',
		url: '/api/v2/users/login',
		data,
	});
	return res.data.user;
};

const useLoginMutation: (
	props: ApiCustomHookProps
) => {
	login: any;
	data: User;
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSettled, onSuccess }) => {
	const client = useQueryClient();
	const history = useHistory();

	const { mutate, isLoading, data, error } = useMutation(
		(data) => login(data),
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

				if (data) {
					setTimeout(() => {
						history.replace('/menu');
					}, 2500);
				}
			},
		}
	);

	return {
		login: mutate,
		data,
		isLoading,
		error,
	};
};

export default useLoginMutation;
