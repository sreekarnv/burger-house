import { User } from '@burger-house/models';
import React from 'react';
import { useMutation } from 'react-query';
import { axios } from '../../../../config/axios';
import type { RegisterUserInput } from '../../types';

const useRegisterMutation = () => {
	const { mutateAsync, isLoading, error, data } = useMutation<
		User,
		any,
		RegisterUserInput,
		any
	>(async ({ email, password, passwordConfirm, name, location }) => {
		const res = await axios({
			withCredentials: true,
			url: '/api/v3/users/register',
			method: 'POST',
			data: {
				email,
				password,
				name,
				passwordConfirm,
				location: {
					coordinates: [...location.coordinates],
				},
			},
		});

		return res.data.user;
	});
	return {
		registerUser: mutateAsync,
		isLoading,
		error,
		data,
	};
};

export default useRegisterMutation;
