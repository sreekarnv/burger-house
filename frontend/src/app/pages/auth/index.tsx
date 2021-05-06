import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

// components
const Login = React.lazy(() => import('./login/Login'));
const Register = React.lazy(() => import('./register/Register'));
const Logout = React.lazy(() => import('./logout/Logout'));

const AuthRoutes: React.FC = () => {
	const route = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${route.path}/login`}>
				<Login />
			</Route>

			<Route exact path={`${route.path}/register`}>
				<Register />
			</Route>

			<Route exact path={`${route.path}/logout`}>
				<Logout />
			</Route>
		</Switch>
	);
};

export default AuthRoutes;
