import './button.scss';
import clsx from 'clsx';
import * as React from 'react';

const sizes = {
	sm: 'btn__size-sm',
	md: 'btn__size-md',
	lg: 'btn__size-lg',
};

const variants = {
	'primary-solid': 'btn__solid--primary',
	'primary-light-solid': 'btn__solid--primary-light',
	'primary-outlined': 'btn__outlined--primary',
	'primary-light-outlined': 'btn__outlined--primary-light',
	'white-solid': 'btn__solid--white',
	'white-outlined': 'btn__outlined--white',
	'black-solid': 'btn__solid--black',
	'black-outlined': 'btn__outlined--black',
	'secondary-solid': 'btn__solid--secondary',
	'secondary-outlined': 'btn__outlined--secondary',
	'tertiary-solid': 'btn__solid--tertiary',
	'tertiary-outlined': 'btn__outlined--tertiary',
	'success-solid': 'btn__solid--success',
	'success-outlined': 'btn__outlined--success',
	'success-light-solid': 'btn__solid--success-light',
	'success-light-outlined': 'btn__outlined--success-light',
	'danger-solid': 'btn__solid--danger',
	'danger-outlined': 'btn__outlined--danger',
	'dark-solid': 'btn__solid--dark',
	'dark-outlined': 'btn__outlined--dark',
	'light-solid': 'btn__solid--light',
	'light-outlined': 'btn__outlined--light',
};

const disabledVariant = {
	outlined: 'btn__outlined--disabled',
	solid: 'btn__solid--disabled',
};

type Props = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	variant?: 'outlined' | 'solid';
	color?: string;
	size?: keyof typeof sizes;
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
			className={clsx([
				'btn',
				sizes[size],
				(variants as any)[`${color}-${variant}`],
				disabled && disabledVariant[variant],
				className,
			])}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
