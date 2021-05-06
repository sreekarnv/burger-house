import './button.scss';

import * as React from 'react';

type Props = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	variant?: 'outlined' | 'solid';
	color?: string;
	size?: 'sm' | 'md' | 'lg';
};

const Button: React.FC<Props> = ({
	children,
	variant = 'solid',
	color = 'primary',
	size = 'md',
	className,
	disabled,
	...props
}) => {
	return (
		<button
			disabled={disabled}
			className={`btn btn__size-${size} btn__${variant}--${color} ${
				disabled ? `btn__${variant}--disabled` : ''
			} ${className ? className : ''}`}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
