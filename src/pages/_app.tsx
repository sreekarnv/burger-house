import './../scss/main.scss';

import { type AppType } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { trpc } from '../utils/trpc';
import BaseLayout from '../layouts/base';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<BaseLayout>
				<Component {...pageProps} />
				<ReactQueryDevtools />
			</BaseLayout>
		</>
	);
};

export default trpc.withTRPC(MyApp);
