import './badge.scss';

import * as React from 'react';

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	color?: 'primary' | 'secondary' | 'success' | 'danger';
	variant?: 'default' | 'rounded';
	size?: 'sm' | 'md';
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
			className={`badge badge--${color} badge--${variant} badge--${size} ${className}`}
			{...props}>
			{children}
		</div>
	);
};

export default Badge;
