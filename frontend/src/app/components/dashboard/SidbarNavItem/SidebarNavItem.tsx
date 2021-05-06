import './sidebar-nav-item.scss';

import * as React from 'react';

import { NavLink } from 'react-router-dom';

interface Props {
	to: string;
	exact?: boolean;
	className?: string;
	icon?: any;
	onClick: () => void;
}

const SidebarNavItem: React.FC<Props> = ({
	to,
	exact,
	className,
	children,
	icon,
	onClick,
}) => {
	return (
		<NavLink
			activeClassName='sidebar-nav-item--active'
			className={`sidebar-nav-item ${className}`}
			{...{ to, exact, onClick }}>
			<span className='sidebar-nav-item__icon'>{icon}</span>
			<span className='sidebar-nav-item__text'>{children}</span>
		</NavLink>
	);
};

export default SidebarNavItem;
