import React from 'react';
import { render } from 'react-dom';
import App from './app/App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './scss/main.scss';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

const queryClient = new QueryClient();

const app = (
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<HashRouter>
					<App />
				</HashRouter>
			</Provider>
			{process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
		</QueryClientProvider>
	</React.StrictMode>
);

render(app, document.getElementById('app'));