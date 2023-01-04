import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { User } from '../../server/models/user.model';
import { trpc } from '../../utils/trpc';

const getData = async (user: User) => {
  const res = await axios({
    method: 'GET',
    url: `https://api.mapbox.com/directions/v5/mapbox/driving/${user.location.coordinates[0]},${user.location.coordinates[1]};78.267961,17.4126274?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}`,
  });

  return res;
};

const useMapBox = () => {
  const context = trpc.useContext();
  const queryClient = useQueryClient();
  const user = context.auth.user.getData();

  const { isLoading, data, error } = useQuery(
    ['map-box'],
    () => getData(user as User),
    {
      initialData: () => {
        return queryClient.getQueryData<any>(['map-box']);
      },
    }
  );

  return { isLoading, data, error };
};

export default useMapBox;
