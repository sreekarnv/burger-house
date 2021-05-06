import './alert.scss';

import * as React from 'react';

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	type?: 'success' | 'danger';
	position?: 'bottom-right' | 'top-center';
};

const Alert: React.FC<Props> = ({
	children,
	position = 'bottom-right',
	type = 'success',
	...props
}) => {
	return (
		<div
			className={`alert u-text-capitalize u-text-center alert--${position} u-p-5 u-bg-${type}`}
			{...props}>
			<p className='u-text-light'>{children}</p>
		</div>
	);
};

export default Alert;
