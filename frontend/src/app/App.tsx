import * as React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { HashRouter } from 'react-router-dom';
import Layout from './layout';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<HashRouter>
				<Layout />
			</HashRouter>
			{process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
		</QueryClientProvider>
	);
};

export default App;
