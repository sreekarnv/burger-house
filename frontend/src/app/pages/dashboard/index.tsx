import React from 'react';
import { useQueryClient } from 'react-query';
import {
	Redirect,
	Route,
	Switch,
	useHistory,
	useRouteMatch,
} from 'react-router';
import { User } from '~@types/user';

import Loader from '~app/components/shared/ui/loader/loader';
import useRoute from '~app/hooks/useRoute';

import './dashboard.scss';

const Sidebar = React.lazy(
	() => import('~app/components/dashboard/Sidebar/Sidebar')
);
const DashboardMeRoutes = React.lazy(() => import('~app/pages/dashboard/me'));
const AdminOrderRoutes = React.lazy(() => import('./admin'));

const DashboardRoutes = () => {
	const { isLoading } = useRoute('protected');
	const route = useRouteMatch();
	const history = useHistory();
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user');

	React.useEffect(() => {
		if (route.path === '/dashboard' && route.isExact) {
			history.replace(`${route.path}/me/orders`);
		}
	}, []);

	if (isLoading) {
		return <Loader fullScreen />;
	}

	return (
		<div className='dashboard'>
			<Sidebar className='dashboard__sidebar' />
			<div className='dashboard__content'>
				<Switch>
					<Route path={`${route.path}/me`}>
						<DashboardMeRoutes />
					</Route>

					<Route path={`${route.path}/admin`}>
						<AdminOrderRoutes />
					</Route>

					<Redirect
						to={
							user?.role === 'admin'
								? `${route.path}/admin`
								: `${route.path}/me`
						}
					/>
				</Switch>
			</div>
		</div>
	);
};

export default DashboardRoutes;
