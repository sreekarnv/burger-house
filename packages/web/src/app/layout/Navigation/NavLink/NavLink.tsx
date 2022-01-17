import clsx from 'clsx';
import React from 'react';
import { NavLink as RNavLink } from 'react-router-dom';

import './navlink.scss';

interface NavLinkProps {
	to: string;
	children: any;
	label: string;
	variant?: 'default' | 'logout';
	showBadge?: boolean;
	badgeValue?: string | number;
}

const NavLink: React.FC<NavLinkProps> = ({
	to,
	children: Icon,
	label,
	variant = 'default',
	showBadge,
	badgeValue,
}) => {
	return (
		<li className='nav-item'>
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
			{showBadge && <span className='nav-link__badge'>{badgeValue}</span>}
		</li>
	);
};

export default NavLink;
