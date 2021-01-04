import React, { Suspense, useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

import { useSelector } from 'react-redux';

import HamburgerIcon from '../Shared/Icons/HamburgerMenu';

import Loader from '../Shared/Components/Loader/Loader';

const Sidebar = React.lazy(() => import('./components/Sidebar/Sidebar'));
const UserOrders = React.lazy(() => import('./User/UserOrders'));
const UserSettings = React.lazy(() => import('./User/UserSettings'));
const UserOrderDetail = React.lazy(() => import('./User/UserOrderDetail'));

const ManageUserOrders = React.lazy(() => import('./Admin/ManageUserOrders'));
const ManageUsers = React.lazy(() => import('./Admin/ManageUsers'));
const ManageMenu = React.lazy(() => import('./Admin/ManageMenu'));
const BurgerDetail = React.lazy(() => import('./Admin/BurgerDetail'));

const DashboardRoutes = () => {
	const route = useRouteMatch();
	const history = useHistory();

	const user = useSelector((state) => state.auth.user);
	const checkAuthUserInit = useSelector(
		(state) => state.auth.checkAuthUserInit
	);
	const [showSidebar, setShowSidebar] = useState(false);

	useEffect(() => {
		if (!user && !checkAuthUserInit) {
			return history.goBack();
		}
	}, [user, checkAuthUserInit, history]);

	if (!user && checkAuthUserInit) {
		return <Loader />;
	}

	return (
		<Suspense fallback={<Loader fullScreen />}>
			<div className='dashboard'>
				{user && (
					<Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
				)}

				{user && (
					<span
						onClick={() => setShowSidebar(true)}
						className='sidebar__toggler'>
						<HamburgerIcon />
					</span>
				)}
				{user && (
					<div className='content'>
						<Route path={route.path} exact>
							<UserSettings />
						</Route>

						<Route path={`${route.path}/orders`} exact>
							<UserOrders />
						</Route>

						<Route path={`${route.path}/orders/:id`} exact>
							<UserOrderDetail />
						</Route>

						<Route path={`${route.path}/manage-orders`} exact>
							<ManageUserOrders />
						</Route>

						<Route path={`${route.path}/manage-orders/:id`} exact>
							<UserOrderDetail admin />
						</Route>

						<Route path={`${route.path}/manage-users`} exact>
							<ManageUsers />
						</Route>

						<Route path={`${route.path}/manage-menu`} exact>
							<ManageMenu />
						</Route>

						<Route path={`${route.path}/manage-menu/:slug`} exact>
							<BurgerDetail />
						</Route>
					</div>
				)}
			</div>
		</Suspense>
	);
};

export default DashboardRoutes;
