import classes from './alert.module.scss';

import * as React from 'react';
import clsx from 'clsx';

const positions = {
	'bottom-right': classes['bottom-right'],
	'top-center': classes['top-center'],
};

const types = {
	success: 'u-bg-success',
	danger: 'u-bg-danger',
};

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	type?: keyof typeof types;
	position?: keyof typeof positions;
};

const Alert: React.FC<Props> = ({
	children,
	position = 'bottom-right',
	type = 'success',
	...props
}) => {
	return (
		<div
			className={clsx([
				classes.root,
				positions[position],
				types[type],
				'u-p-5 u-text-center u-text-capitalize',
			])}
			{...props}>
			<p className={clsx([classes.text, 'u-text-light'])}>{children}</p>
		</div>
	);
};

export default Alert;
