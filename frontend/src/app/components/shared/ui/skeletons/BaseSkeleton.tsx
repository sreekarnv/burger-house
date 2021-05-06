import './base-skeleton.scss';

import * as React from 'react';

interface Props {
	type?: 'text' | 'title' | 'avatar' | 'image';
	className?: string;
}

const BaseSkeleton: React.FC<Props> = ({ type = 'text', className }) => {
	return (
		<div className={`base-skeleton base-skeleton--${type} ${className}`}></div>
	);
};

export default BaseSkeleton;
