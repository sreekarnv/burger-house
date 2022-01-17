import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../../config/axios';

export const updateDetails = async (data: any) => {
	const res = await axios({
		method: 'PATCH',
		url: '/api/v3/users/me',
		data,
	});
	return res.data.data;
};

const useUpdateUserDetailsMutation = () => {
	const client = useQueryClient();

	const { mutateAsync, isLoading, data, error } = useMutation<FormData>(
		(data) => updateDetails(data),
		{
			onSuccess: (data) => {
				client.setQueryData('user', data);
			},
		}
	);

	return {
		updateDetails: mutateAsync,
		data,
		isLoading,
		error,
	};
};

export default useUpdateUserDetailsMutation;
