import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';

import classes from './scss/nav-link-mobile.module.scss';

interface NavLinkMobileProps extends LinkProps {
	onClick: () => void;
	variant?: 'default' | 'logout';
	icon: React.FC<{ size: number }>;
	label: string;
	showBadge?: boolean;
	badgeValue?: string | number;
}

const NavLinkMobile: React.FC<NavLinkMobileProps> = ({
	icon: Icon,
	label,
	showBadge,
	badgeValue,
	variant = 'default',
	...props
}) => {
	return (
		<>
			<li className={classes.item}>
				<Link
					className={clsx(
						classes.root,
						variant === 'logout' && 'u-text-danger'
					)}
					{...props}>
					<span>
						<Icon size={18} />
					</span>
					<span className={classes.text}>{label}</span>
				</Link>
				{showBadge && <span className={classes.badge}>{badgeValue}</span>}
			</li>
		</>
	);
};

export default NavLinkMobile;
