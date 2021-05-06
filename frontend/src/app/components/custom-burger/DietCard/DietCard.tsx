import './diet-card.scss';

import * as React from 'react';

import { NavLink, NavLinkProps } from 'react-router-dom';

type Props = React.PropsWithoutRef<NavLinkProps<any>> &
	React.RefAttributes<HTMLAnchorElement> & {
		veg?: boolean;
	};

const DietCard: React.FC<Props> = (props) => {
	const { className, veg, to } = props;

	return (
		<NavLink
			to={to}
			className={`diet-card ${veg ? 'diet-card--veg' : 'diet-card--non-veg'} ${
				className ? className : ''
			}`}>
			<p>{veg ? 'Vegetarian' : 'Non Vegetarian'}</p>
		</NavLink>
	);
};

export default DietCard;
