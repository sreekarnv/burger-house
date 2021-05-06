import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Error from '~app/pages/error/Error';

// Components
const Home = React.lazy(() => import('../pages/home/Home'));
const Cart = React.lazy(() => import('../pages/cart/Cart'));
const MenuRoutes = React.lazy(() => import('../pages/menu'));
const DashboardRoutes = React.lazy(() => import('~app/pages/dashboard'));
const AuthRoutes = React.lazy(() => import('~app/pages/auth'));

const Body: React.FC = () => {
	return (
		<Switch>
			<Route path='/' exact>
				<Home />
			</Route>
			<Route path='/cart' exact>
				<Cart />
			</Route>
			<Route path='/auth'>
				<AuthRoutes />
			</Route>
			<Route path='/menu'>
				<MenuRoutes />
			</Route>
			<Route path='/dashboard'>
				<DashboardRoutes />
			</Route>
			<Route path='/error'>
				<Error />
			</Route>
			<Redirect to='/error' />
		</Switch>
	);
};

export default Body;
