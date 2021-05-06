import * as customBurgerActions from '~app/store/actions/customBurgerActions';

import { QueryObserverResult, RefetchOptions, useQuery } from 'react-query';

import { Ingredient } from '~@types/ingredient';
import React from 'react';
import axios from '~app/axios';
import { useDispatch } from 'react-redux';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
	params?: any;
};

const getIngredients = async (params: any) => {
	const res = await axios({
		method: 'GET',
		url: '/api/v2/ingredients',
		params,
	});
	return res.data.data;
};

const useIngredientsQuery: (
	props: ApiCustomHookProps
) => {
	data: Ingredient[];
	isLoading: boolean;
	error: unknown;
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<any, unknown>>;
} = ({ onError, onSuccess, onSettled, params }) => {
	const dispatch = useDispatch();

	const { error, isLoading, refetch, data } = useQuery(
		'ingredients',
		() => getIngredients(params),
		{
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				dispatch(customBurgerActions.initCustomBurgerIngredients(data));

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
			},
		}
	);

	React.useEffect(() => {
		refetch();
	}, [params]);

	return {
		data,
		error,
		isLoading,
		refetch,
	};
};

export default useIngredientsQuery;
