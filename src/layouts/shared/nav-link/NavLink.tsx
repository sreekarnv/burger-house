import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import classes from './scss/nav-link.module.scss';

interface NavLinkProps extends LinkProps {
	label: string;
	children: React.FC<{ size: number }>;
	variant?: 'default' | 'logout';
	showBadge?: boolean;
	badgeValue?: string | number;
}

const NavLink: React.FC<NavLinkProps> = ({
	children: Icon,
	label,
	variant = 'default',
	showBadge,
	badgeValue,
	...props
}) => {
	const router = useRouter();
	const isActive = router.pathname === props.href;

	return (
		<li className={classes.item}>
			<Link
				className={clsx([
					classes.root,
					variant === 'logout' && classes.logout,
					isActive && classes.active,
				])}
				{...props}>
				<div className={classes.icon}>
					<Icon size={22} />
				</div>
				<small className={classes.label}>{label}</small>
			</Link>
			{showBadge && <span className={classes.badge}>{badgeValue}</span>}
		</li>
	);
};

export default NavLink;
