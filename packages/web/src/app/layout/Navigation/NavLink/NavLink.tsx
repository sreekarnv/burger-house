import clsx from 'clsx';
import React from 'react';
import { NavLink as RNavLink } from 'react-router-dom';

import './navlink.scss';

interface NavLinkProps {
	to: string;
	children: any;
	label: string;
	variant?: 'default' | 'logout';
}

const NavLink: React.FC<NavLinkProps> = ({
	to,
	children: Icon,
	label,
	variant = 'default',
}) => {
	return (
		<li>
			<RNavLink
				to={to}
				className={({ isActive }) =>
					clsx([
						'nav-link',
						variant === 'logout' && 'nav-link--logout',
						isActive && 'nav-link--active',
					])
				}>
				<div
					className={clsx([
						variant === 'logout' && 'nav-link__icon--logout',
						'nav-link__icon',
					])}>
					<Icon size={22} />
				</div>
				<small
					className={clsx([
						'nav-link__label',
						variant === 'logout' && 'nav-link__label--logout',
					])}>
					{label}
				</small>
			</RNavLink>
		</li>
	);
};

export default NavLink;
