import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Redirect } from 'react-router-dom';

const Orders = React.lazy(() => import('./orders/Orders'));
const Profile = React.lazy(() => import('./profile/Profile'));
const MeOrderDetail = React.lazy(() => import('./me-order-detail'));

const DashboardMeRoutes: React.FC = () => {
	const route = useRouteMatch();

	return (
		<Switch>
			<Route path={`${route.path}/orders`} exact>
				<Orders />
			</Route>

			<Route path={`${route.path}/profile`} exact>
				<Profile />
			</Route>

			<Route path={`${route.path}/orders/:id`} exact>
				<MeOrderDetail />
			</Route>

			<Redirect to={`${route.path}/orders`} />
		</Switch>
	);
};

export default DashboardMeRoutes;
