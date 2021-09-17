import './badge.scss';

import * as React from 'react';

const colors = {
	primary: 'badge--primary',
	secondary: 'badge--secondary',
	success: 'badge--success',
	danger: 'badge--danger',
};

const variants = {
	default: 'badge--default',
	rounded: 'badge--rounded',
};

const sizes = {
	sm: 'badge--sm',
	md: 'badge--md',
};

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	color?: keyof typeof colors;
	variant?: keyof typeof variants;
	size?: keyof typeof sizes;
};

const Badge: React.FC<Props> = ({
	children,
	color = 'success',
	variant = 'default',
	size = 'sm',
	className,
	...props
}) => {
	return (
		<div
			className={`badge ${colors[color]} ${variants[variant]} ${sizes[size]} ${
				className ? className : ''
			}`}
			{...props}>
			{children}
		</div>
	);
};

export default Badge;
