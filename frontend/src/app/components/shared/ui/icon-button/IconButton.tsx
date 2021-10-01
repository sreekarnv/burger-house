import './icon-button.scss';

import * as React from 'react';

const sizes = {
	sm: 'icon-btn__size--sm',
	lg: 'icon-btn__size-lg',
};

type Props = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	size?: 'sm' | 'lg';
};

const IconButton: React.FC<Props> = ({
	children,
	size = 'sm',
	className,
	...props
}) => {
	return (
		<button
			className={`icon-btn ${sizes[size]} ${className ? className : ''}`}
			{...props}>
			{children}
		</button>
	);
};

export default IconButton;
