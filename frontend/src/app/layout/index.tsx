import * as React from 'react';
import * as locationActions from '~app/store/actions/geoLocationActions';

import { useDispatch, useSelector } from 'react-redux';

import Loader from '~app/components/shared/ui/loader/loader';
import { ReduxState } from '~@types/store';
import useCheckAuth from '~app/hooks/api/queries/useCheckAuth';

const Body = React.lazy(() => import('./Body'));
const Footer = React.lazy(() => import('./Footer/Footer'));
const Navigation = React.lazy(() => import('./Navigation/Navigation'));

const Layout = () => {
	const { isLoading } = useCheckAuth();
	const allowLocation = useSelector(
		(state: ReduxState) => state.location.allowLocation
	);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (allowLocation) {
			dispatch(locationActions.updateError(false));
			navigator.geolocation.getCurrentPosition(
				(res: any) => {
					const longitude = res.coords.longitude as never;
					const latitude = res.coords.latitude as never;
					dispatch(
						locationActions.updateLocationCoordinates([longitude, latitude])
					);
				},
				(err) => {
					if (err) {
						dispatch(locationActions.updateBrowerAllowLocation(false));
						dispatch(locationActions.updateError(true));
					}
				}
			);
		} else {
			dispatch(locationActions.updateLocationCoordinates([]));
		}
	}, [allowLocation]);

	if (isLoading) {
		return <Loader fullScreen />;
	}

	return (
		<>
			<React.Suspense fallback={<Loader fullScreen />}>
				<Navigation />
				<Body />
				<Footer />
			</React.Suspense>
		</>
	);
};

export default Layout;
