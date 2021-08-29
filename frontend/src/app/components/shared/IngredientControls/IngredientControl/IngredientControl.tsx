import './ingredient-control.scss';

import * as React from 'react';

import AddRemoveBtn from 'src/app/components/shared/ui/add-remove-btn/AddRemoveBtn';
import { Ingredient } from 'src/@types/ingredient';
import useDynamicImage from 'src/app/hooks/useDynamicImage';

interface Props {
	ingredient: Ingredient;
	removeIngredient: (i: any) => void;
	addIngredient: (i: any) => void;
}

const IngredientControl: React.FC<Props> = (props) => {
	const { ingredient, removeIngredient, addIngredient } = props;
	const { imageRef } = useDynamicImage(
		process.env.REACT_APP_SERVER_URL! + ingredient.photoUrl
	);

	return (
		<div className='ingredient-control'>
			<span className='ingredient-control-details'>
				<img
					className='ingredient-control-details--photo'
					ref={imageRef}
					alt={ingredient.name}
				/>
				<p className='ingredient-control-details--name'>
					{ingredient.name} ({`Rs ${ingredient.price}`})
				</p>
			</span>
			<AddRemoveBtn leftOnClick={addIngredient} rightOnClick={removeIngredient}>
				{ingredient.amount}
			</AddRemoveBtn>
		</div>
	);
};

export default IngredientControl;
