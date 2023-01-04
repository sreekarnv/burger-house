import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import {
  updateError,
  updateLocationCoordinates,
} from '../../store/modules/geoLocation';

const useGeolocation = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const onGeolocationAccess = () => {
    if (typeof window !== 'undefined') {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (res) => {
          const longitude = res.coords.longitude as never;
          const latitude = res.coords.latitude as never;
          dispatch(
            updateLocationCoordinates({ coordinates: [longitude, latitude] })
          );
          setIsLoading(false);
        },
        (error) => {
          dispatch(updateError({ error }));
          setIsLoading(false);
        }
      );
    }
  };

  return {
    onGeolocationAccess,
    isLoading,
  };
};

export default useGeolocation;
