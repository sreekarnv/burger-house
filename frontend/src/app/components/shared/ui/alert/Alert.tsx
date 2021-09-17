import './alert.scss';

import * as React from 'react';

const positions = {
	'bottom-right': 'alert--bottom-right',
	'top-center': 'alert--top-center',
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
			className={`alert u-text-capitalize u-text-center u-p-5 ${positions[position]} ${types[type]}`}
			{...props}>
			<p className='u-text-light'>{children}</p>
		</div>
	);
};

export default Alert;
