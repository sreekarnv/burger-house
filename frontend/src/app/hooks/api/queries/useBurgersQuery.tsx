import * as burgerActions from 'src/app/store/actions/burgerActions';

import { QueryObserverResult, RefetchOptions, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { Burger } from 'src/@types/burger';
import React from 'react';
import { ReduxState } from 'src/@types/store';
import axios from 'src/app/axios';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
	params?: any;
};

const getBurgers = async (params: any) => {
	const res = await axios({
		method: 'GET',
		url: '/api/v2/burgers',
		params,
	});
	return res.data.data;
};

const useBurgersQuery: (props: ApiCustomHookProps) => {
	data: Burger[];
	isLoading: boolean;
	error: unknown;
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<any, unknown>>;
} = ({ onError, onSuccess, onSettled, params }) => {
	const dispatch = useDispatch();
	const burgers = useSelector((state: ReduxState) => state.burgers.burgers);
	const cartBurgers = useSelector((state: ReduxState) => state.cart.cart);

	const { error, isLoading, refetch } = useQuery(
		'burgers',
		() => getBurgers(params),
		{
			onSuccess: (data) => {
				dispatch(burgerActions.getBurgers(data, cartBurgers));

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
			refetchOnWindowFocus: false,
		}
	);

	React.useEffect(() => {
		refetch();
	}, [params]);

	return {
		data: burgers,
		error,
		isLoading,
		refetch,
	};
};

export default useBurgersQuery;
