import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { User } from '@burger-house/models';

const getData = async (user: User) => {
	const res = await axios({
		method: 'GET',
		url: `https://api.mapbox.com/directions/v5/mapbox/driving/${user.location.coordinates[0]},${user.location.coordinates[1]};78.267961,17.4126274?geometries=geojson&access_token=${process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}`,
	});

	return res;
};

const useMapBox = () => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const { isLoading, data, error } = useQuery('map-box', () => getData(user), {
		initialData: () => {
			return queryClient.getQueryData<any>('map-box');
		},
	});

	return { isLoading, data, error };
};

export default useMapBox;
