import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Badge from '~app/components/shared/ui/badge/Badge';

import './nav-item.scss';

interface Props {
	to: string;
	exact?: boolean;
	badgeValue?: number | string;
	showBadge?: boolean;
	logout?: boolean;
	onClick?: () => void;
}

const NavItem: React.FC<Props> = ({
	to,
	children,
	exact,
	showBadge,
	badgeValue,
	onClick,
	logout,
}) => {
	return (
		<NavLink
			className={`nav-item ${logout ? 'nav-item__logout' : ''}`}
			activeClassName={logout ? '' : 'nav-item--active'}
			{...{ to, exact, onClick }}>
			{showBadge && (
				<Badge
					className='nav-item__badge'
					color='primary'
					variant='rounded'
					size='sm'>
					{badgeValue}
				</Badge>
			)}
			{children}
		</NavLink>
	);
};

export default NavItem;
