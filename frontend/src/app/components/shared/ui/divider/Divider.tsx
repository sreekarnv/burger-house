import './divider.scss';

import * as React from 'react';

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

const Divider: React.FC<Props> = ({ color, className, ...props }) => {
	return (
		<div
			className={`divider u-bg-${color} ${className ? className : ''}`}
			{...props}
		/>
	);
};

export default Divider;
