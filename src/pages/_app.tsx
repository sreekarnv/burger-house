import './../scss/main.scss';

import { Provider } from 'react-redux';
import { type AppType } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { trpc } from '../utils/trpc';
import BaseLayout from '../layouts/base';
import { store } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import React from 'react';
import {
	updateError,
	updateLocationCoordinates,
} from '../store/modules/geoLocation';
import { initCart } from '../store/modules/cart';
import { togglePageIsReady } from '../store/modules/app';

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { isLoading, isFetched } = trpc.auth.user.useQuery();
	const dispatch = useAppDispatch();
	const pageIsReady = useAppSelector((state) => state.app.pageIsReady);

	React.useEffect(() => {
		if (isFetched && !pageIsReady) {
			const timer = setTimeout(() => {
				dispatch(togglePageIsReady());
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [isFetched, pageIsReady, dispatch]);

	React.useEffect(() => {
		dispatch(initCart());
	}, [dispatch]);

	if (isLoading) return <div>Loading....</div>;
	return <>{children}</>;
};

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<Provider store={store}>
				<AppProvider>
					<BaseLayout>
						<Component {...pageProps} />
						<ReactQueryDevtools />
					</BaseLayout>
				</AppProvider>
			</Provider>
		</>
	);
};

export default trpc.withTRPC(MyApp);
