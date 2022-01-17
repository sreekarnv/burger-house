import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { axios } from '../../../../config/axios';
import { initIngredients } from '../../../../store/modules/customBurger';

const useGetIngredients = () => {
	const dispatch = useDispatch();
	const { isLoading, data, error, isFetched } = useQuery(
		'ingredients',
		async () => {
			const res = await axios({
				method: 'GET',
				url: '/api/v3/ingredients',
			});

			return res.data.ingredients;
		},
		{
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				dispatch(initIngredients({ ingredients: data }));
			},
		}
	);

	return {
		isLoading,
		ingredients: data,
		error,
		isFetched,
	};
};

export default useGetIngredients;
