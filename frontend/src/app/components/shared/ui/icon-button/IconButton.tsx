import './icon-button.scss';

import * as React from 'react';

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
			className={`icon-btn icon-btn__size--${size} ${
				className ? className : ''
			}`}
			{...props}>
			{children}
		</button>
	);
};

export default IconButton;
