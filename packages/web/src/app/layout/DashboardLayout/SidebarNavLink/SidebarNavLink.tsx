import './sidebar-nav-link.scss';

import * as React from 'react';

import { NavLink } from 'react-router-dom';

interface Props {
	to: string;
	exact?: boolean;
	className?: string;
	icon?: any;
	onClick: () => void;
}

const SidebarNavLink: React.FC<Props> = ({
	to,
	exact,
	className,
	children,
	icon,
	onClick,
}) => {
	return (
		<NavLink
			className={({ isActive }) =>
				`sidebar-nav-link ${
					isActive ? 'sidebar-nav-link--active' : ''
				}  ${className}`
			}
			{...{ to, exact, onClick }}>
			<span className='sidebar-nav-link__icon'>{icon}</span>
			<span className='sidebar-nav-link__text'>{children}</span>
		</NavLink>
	);
};

export default SidebarNavLink;
