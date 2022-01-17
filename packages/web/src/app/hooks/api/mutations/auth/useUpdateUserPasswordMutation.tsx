import { useMutation } from 'react-query';
import { axios } from '../../../../config/axios';

export const updatePassword = async (data: any) => {
	const res = await axios({
		method: 'POST',
		url: '/api/v3/users/update-password',
		data,
	});
	return res.data.user;
};

const useUpdateUserPasswordMutation = () => {
	const { mutateAsync, isLoading, data, error } = useMutation<{
		currentPassword: string;
		password: string;
		passwordConfirm: string;
	}>((data) => updatePassword(data));

	return {
		updatePassword: mutateAsync,
		data,
		isLoading,
		error,
	};
};

export default useUpdateUserPasswordMutation;
