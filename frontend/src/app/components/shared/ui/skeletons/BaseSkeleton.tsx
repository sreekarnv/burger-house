import './base-skeleton.scss';

import * as React from 'react';

const variants = {
	text: 'base-skeleton--text',
	title: 'base-skeleton--title',
	avatar: 'base-skeleton--avatar',
	image: 'base-skeleton--image',
};

interface Props {
	type?: keyof typeof variants;
	className?: string;
}

const BaseSkeleton: React.FC<Props> = ({ type = 'text', className }) => {
	return (
		<div
			className={`base-skeleton ${variants[type]} ${
				className ? className : ''
			}`}></div>
	);
};

export default BaseSkeleton;
