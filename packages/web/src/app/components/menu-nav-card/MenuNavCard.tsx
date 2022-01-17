import './menu-nav-card.scss';

import * as React from 'react';

import { NavLink } from 'react-router-dom';

type Props = React.RefAttributes<HTMLAnchorElement> & {
	veg?: boolean;
	children?: any;
	className?: string;
	to: string;
};

const MenuNavCard: React.FC<Props> = (props) => {
	const { className, veg, to } = props;

	return (
		<NavLink
			to={to}
			className={`menu-nav-card ${
				veg ? 'menu-nav-card--veg' : 'menu-nav-card--non-veg'
			} ${className ? className : ''}`}>
			<p>{veg ? 'Vegetarian' : 'Non Vegetarian'}</p>
		</NavLink>
	);
};

export default MenuNavCard;
