import './ingredient-control.scss';

import * as React from 'react';
import { Ingredient } from '@burger-house/models';
import AddRemoveButton from '../shared/ui/add-remove-button/AddRemoveButton';

import './ingredient-control.scss';

interface Props {
	ingredient: Ingredient & { amount: number };
	removeIngredient: (i: any) => void;
	addIngredient: (i: any) => void;
}

const IngredientControl: React.FC<Props> = (props) => {
	const { ingredient, removeIngredient, addIngredient } = props;

	return (
		<div className='ingredient-control'>
			<span className='ingredient-control-details'>
				<img
					className='ingredient-control-details--photo'
					src={process.env.REACT_APP_SERVER_URL + ingredient.photo}
					alt={ingredient.name}
				/>
				<p className='ingredient-control-details--name'>
					{ingredient.name} ({`Rs ${ingredient.price}`})
				</p>
			</span>
			<AddRemoveButton
				leftOnClick={addIngredient}
				rightOnClick={removeIngredient}>
				{ingredient.amount || 0}
			</AddRemoveButton>
		</div>
	);
};

export default IngredientControl;
