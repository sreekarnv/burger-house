import './divider.scss';
import clsx from 'clsx';

import * as React from 'react';

const colors = {
	white: 'u-bg-white',
	black: 'u-bg-black',
	primary: 'u-bg-primary',
	'primary-light': 'u-bg-primary-light',
	secondary: 'u-bg-secondary',
	tertiary: 'u-bg-tertiary',
	success: 'u-bg-success',
	'success-light': 'u-bg-success-light',
	danger: 'u-bg-danger',
	dark: 'u-bg-dark',
	light: 'u-bg-light',
};

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	color: keyof typeof colors;
};

const Divider: React.FC<Props> = ({ color, className, ...props }) => {
	return (
		<div className={clsx(['divider', colors[color], className])} {...props} />
	);
};

export default Divider;
