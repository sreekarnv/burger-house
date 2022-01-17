import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav-mobile-link.scss';

interface NavLinkMobileProps {
	to: string;
	onClick: () => void;
	variant?: 'default' | 'logout';
	icon: any;
	label: string;
	showBadge?: boolean;
	badgeValue?: string | number;
}

const NavLinkMobile: React.FC<NavLinkMobileProps> = ({
	to,
	onClick,
	icon: Icon,
	label,
	showBadge,
	badgeValue,
	variant = 'default',
}) => {
	return (
		<>
			<li className='nav-mobile-item'>
				<NavLink
					className={({ isActive }) =>
						clsx(
							'nav-mobile-link',
							variant === 'logout' && 'u-text-danger',
							variant === 'default' && isActive && 'u-text-tertiary'
						)
					}
					onClick={onClick}
					to={to}>
					<span>
						<Icon size={18} />
					</span>
					<span className='nav-mobile-link__text'>{label}</span>
				</NavLink>
				{showBadge && (
					<span className='nav-mobile-link__badge'>{badgeValue}</span>
				)}
			</li>
		</>
	);
};

export default NavLinkMobile;
