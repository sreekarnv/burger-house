import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import axios from '~app/axios';

export const logout = async () => {
	const res = await axios({
		method: 'GET',
		url: '/api/v2/users/logout',
	});
	return res.data.user;
};

const useLogoutQuery = () => {
	const history = useHistory();

	useQuery('user', logout, {
		onSettled: () => {
			history.replace('/');
		},
	});
};

export default useLogoutQuery;
