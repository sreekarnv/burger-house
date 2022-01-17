import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../../config/axios';

export const updateDetails = async (
	id: string,
	status: 'pending' | 'delivered' | 'cancelled'
) => {
	const res = await axios({
		method: 'PATCH',
		url: `/api/v3/orders/me/${id}`,
		data: {
			status: status || 'cancelled',
		},
	});
	return res.data.order;
};

const useUpdateOrderMutation = () => {
	const client = useQueryClient();

	const { mutateAsync, isLoading, data, error } = useMutation(
		({
			id,
			status,
		}: {
			id: string;
			status: 'pending' | 'delivered' | 'cancelled';
		}) => updateDetails(id, status),
		{
			onSuccess: (data) => {
				client.setQueryData(['order', data._id], data);
			},
		}
	);

	return {
		updateOrderStatus: mutateAsync,
		data,
		isLoading,
		error,
	};
};

export default useUpdateOrderMutation;
