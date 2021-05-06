import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AdminOrderDetail from './admin-order-detail';

const Orders = React.lazy(() => import('./orders/Orders'));

interface Props {}

const AdminOrderRoutes: React.FC<Props> = () => {
	const route = useRouteMatch();

	return (
		<Switch>
			<Route path={`${route.url}/orders`} exact>
				<Orders />
			</Route>

			<Route path={`${route.url}/orders/:id`} exact>
				<AdminOrderDetail />
			</Route>
		</Switch>
	);
};

export default AdminOrderRoutes;
