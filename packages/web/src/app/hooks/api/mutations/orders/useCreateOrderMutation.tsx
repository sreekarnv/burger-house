import { useMutation } from 'react-query';
import { axios } from '../../../../config/axios';
import { CartBurger } from '../../../../store/types';

const useCreateOrderMutation = () => {
	const { data, error, isLoading, mutateAsync } = useMutation(
		async ({ items, price }: { items: CartBurger[]; price: number }) => {
			const orderItems = items.map((item) => {
				const ingredients: any = [];
				item.ingredients.forEach((ing) => {
					ingredients.push({
						amount: ing.amount,
						name: ing?.ingredient
							? (ing.ingredient as any).name
							: (ing as any).name,
					});
				});

				return { ...item, ingredients };
			});

			const res = await axios({
				method: 'POST',
				url: '/api/v3/orders/me',
				data: {
					items: orderItems,
					price,
				},
			});

			return res.data.order;
		}
	);

	return {
		createOrder: mutateAsync,
		data,
		error,
		isLoading,
	};
};

export default useCreateOrderMutation;
