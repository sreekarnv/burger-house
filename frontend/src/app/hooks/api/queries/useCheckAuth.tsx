import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'src/app/axios';

const checkAuth = async () => {
	const res = await axios({
		method: 'GET',
		url: '/api/v2/users/checkAuth',
	});
	return res.data.user;
};

const useCheckAuth = () => {
	const { isLoading } = useQuery('user', checkAuth);

	return { isLoading };
};

export default useCheckAuth;
