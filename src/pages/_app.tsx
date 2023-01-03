import './../scss/main.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { trpc } from '../utils/trpc';
import { store } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import React from 'react';
import { initCart } from '../store/modules/cart';
import { togglePageIsReady } from '../store/modules/app';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import PageLoader from '../components/shared/loaders/page-loader';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

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

	if (isLoading) return <PageLoader variant='full' />;

	return <>{children}</>;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			<Provider store={store}>
				<AppProvider>
					{getLayout(<Component {...pageProps} />)}
					<ReactQueryDevtools />
				</AppProvider>
			</Provider>
		</>
	);
};

export default trpc.withTRPC(MyApp);
