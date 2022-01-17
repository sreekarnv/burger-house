import { User } from '@burger-house/models';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../../config/axios';

const useLoginMutation = () => {
	const queryClient = useQueryClient();
	const { mutateAsync, isLoading, error, data } = useMutation<
		User,
		any,
		{ email: string; password: string },
		any
	>(
		async ({ email, password }) => {
			const res = await axios({
				withCredentials: true,
				url: '/api/v3/users/login',
				method: 'POST',
				data: {
					email,
					password,
				},
			});

			return res.data.user;
		},
		{
			onSuccess: (data) => {
				queryClient.setQueryData<User>('user', data);
			},
		}
	);
	return {
		loginUser: mutateAsync,
		isLoading,
		error,
		data,
	};
};

export default useLoginMutation;
