import * as burgerActions from 'src/app/store/actions/burgerActions';

import { useDispatch, useSelector } from 'react-redux';

import { Burger } from 'src/@types/burger';
import { ReduxState } from 'src/@types/store';
import axios from 'src/app/axios';
import { useQuery } from 'react-query';

type ApiCustomHookProps = {
	onError?: ((err: unknown) => void) | undefined;
	onSuccess?: ((data: any) => void) | undefined;
	onSettled?: ((data: any, error: unknown) => void) | undefined;
};

const getNewBurgers = async () => {
	const res = await axios({
		method: 'GET',
		url: '/api/v2/burgers/get-new-burgers',
	});
	return res.data.data;
};

const useNewBurgersQuery: (props: ApiCustomHookProps) => {
	data: Burger[];
	isLoading: boolean;
	error: unknown;
} = ({ onError, onSuccess, onSettled }) => {
	const dispatch = useDispatch();
	const newBurgers = useSelector(
		(state: ReduxState) => state.burgers.newBurgers
	);
	const burgers = useSelector((state: ReduxState) => state.burgers.burgers);

	const { error, isLoading } = useQuery('new-burgers', getNewBurgers, {
		onSuccess: (data) => {
			if (!newBurgers.length || !burgers.length) {
				dispatch(burgerActions.getNewBurgers(data));
			}

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
	});

	return {
		data: newBurgers,
		error,
		isLoading,
	};
};

export default useNewBurgersQuery;
