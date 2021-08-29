import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

// Components
import MenuList from 'src/app/pages/menu/menu-list/MenuList';

const DietChoice = React.lazy(
	() => import('src/app/pages/menu/make-my-burger/DietChoice/DietChoice')
);
const MakeBurger = React.lazy(
	() => import('src/app/pages/menu/make-my-burger/MakeBurger/MakeBurger')
);

const Menu: React.FC = () => {
	const route = useRouteMatch();

	return (
		<Switch>
			<Route path={route.path} exact>
				<MenuList />
			</Route>

			<Route path={`${route.path}/make-my-burger`} exact>
				<DietChoice />
			</Route>

			<Route path={`${route.path}/make-my-burger/:foodType`} exact>
				<MakeBurger />
			</Route>
		</Switch>
	);
};

export default Menu;
