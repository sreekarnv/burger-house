import './scss/main.scss';

import * as React from 'react';

import App from './app/App';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from '~app/store';

const app = (
	<React.StrictMode>
		<Provider {...{ store }}>
			<App />
		</Provider>
	</React.StrictMode>
);

render(app, document.getElementById('app'));
