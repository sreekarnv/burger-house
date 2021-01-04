import React from 'react';
import AddOrRemoveButton from '../../Buttons/AddorRemoveButton';

const IngredientControl = (props) => {
	const { ingredient, removeIngredient, addIngredient } = props;

	return (
		<div className='ingredient-control'>
			<span className='ingredient-control-details'>
				<img
					className='ingredient-control-details--photo'
					src={ingredient.photoUrl}
					alt={ingredient.name}
				/>
				<p className='ingredient-control-details--name'>
					{ingredient.name} ({`Rs ${ingredient.price}`})
				</p>
			</span>
			<AddOrRemoveButton addItem={addIngredient} removeItem={removeIngredient}>
				{ingredient.amount}
			</AddOrRemoveButton>
		</div>
	);
};

export default IngredientControl;
