import classes from './scss/alert.module.scss';

import { HiOutlineXCircle } from 'react-icons/hi';
import * as React from 'react';
import clsx from 'clsx';

const positions = {
	'bottom-right': classes['bottom-right'],
	'top-center': classes['top-center'],
};

const types = {
	success: classes.success,
	danger: classes.danger,
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
				'u-text-capitalize',
			])}
			{...props}>
			<HiOutlineXCircle className={classes.icon} />
			<p className={clsx([classes.text])}>{children}</p>
		</div>
	);
};

export default Alert;
