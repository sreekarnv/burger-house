import './ingredient.scss';

import * as React from 'react';

interface Props {
	height: string | number;
	color: string;
}

const Ingredient: React.FC<Props> = (props) => {
	const { height, color } = props;

	return (
		<div
			className='ingredient u-mb-4'
			style={{ height, width: '100%', backgroundColor: color }}></div>
	);
};

export default Ingredient;
