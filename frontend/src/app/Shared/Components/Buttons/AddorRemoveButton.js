import React from 'react';
import AddIcon from '../../Icons/AddIcon';
import SubtractIcon from '../../Icons/SubtractIcon';
import IconButton from './IconButton';

const AddOrRemoveButton = (props) => {
	const { lg, addItem, color, children, removeItem, className } = props;

	return (
		<div
			className={`add-or-remove-btn ${
				lg && 'add-or-remove-btn__lg'
			} ${className}`}>
			<IconButton onClick={addItem} lg={lg} color={color}>
				<AddIcon />
			</IconButton>
			<p>{children}</p>
			<IconButton onClick={removeItem} lg={lg} color={color}>
				<SubtractIcon />
			</IconButton>
		</div>
	);
};

export default AddOrRemoveButton;
