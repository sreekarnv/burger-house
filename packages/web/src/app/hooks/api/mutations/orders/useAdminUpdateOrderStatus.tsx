import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../../config/axios';

export const updateDetails = async (
	id: string,
	status: 'pending' | 'delivered' | 'cancelled'
) => {
	const res = await axios({
		method: 'PATCH',
		url: `/api/v3/orders/${id}`,
		data: {
			status: status || 'cancelled',
		},
	});
	return res.data.order;
};

const useAdminUpdateOrderMutation = () => {
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
				client.setQueryData(['admin-order', data._id], data);
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

export default useAdminUpdateOrderMutation;
