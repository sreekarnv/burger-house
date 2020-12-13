import React from "react";

const Ingredient = (props) => {
	const { height, width, color } = props;

	return (
		<div
			className='burger-ingredients'
			style={{ height, width, backgroundColor: color }}></div>
	);
};

export default Ingredient;
