import React from "react";

import { NavLink, useRouteMatch } from "react-router-dom";

const SidebarNavItem = (props) => {
	const route = useRouteMatch();

	const { to, exact, children, onClick } = props;

	return (
		<NavLink
			exact={exact}
			activeClassName='sidebar__nav-link--active'
			className='sidebar__nav-link'
			onClick={onClick}
			to={`${route.path}${to}`}>
			{children}
		</NavLink>
	);
};

export default SidebarNavItem;
