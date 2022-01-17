import './button.scss';
import clsx from 'clsx';
import * as React from 'react';
import { Link } from 'react-router-dom';

const variants = {
	primary: 'btn__primary--solid',
	'primary-outline': 'btn__primary--outline',
	secondary: 'btn__secondary--solid',
	'secondary-outline': 'btn__secondary--outline',
	tertiary: 'btn__tertiary--solid',
	'tertiary-outline': 'btn__tertiary--outline',
	success: 'btn__success--solid',
	'success-outline': 'btn__success--outline',
	danger: 'btn__danger--solid',
	'danger-outline': 'btn__danger--outline',
	dark: 'btn__dark--solid',
	'dark-outline': 'btn__dark--outline',
};

const sizes = {
	sm: 'btn--sm',
	md: 'btn--md',
	lg: 'btn--lg',
};

type Props = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	variant?: keyof typeof variants;
	size?: keyof typeof sizes;
	isLink?: boolean;
	to?: string;
};

const Button: React.FC<Props> = ({
	children,
	variant = 'primary',
	size = 'md',
	isLink = false,
	className,
	disabled,
	to,
	...props
}) => {
	const template = (
		<button
			disabled={disabled}
			className={clsx(['btn', sizes[size], variants[variant], className])}
			{...props}>
			{children}
		</button>
	);

	if (isLink && to) {
		return <Link to={to}>{template}</Link>;
	}

	return template;
};

export default Button;
