import * as React from 'react';

import IngredientControl from '../ingredient-control/IngredientControl';
import { useDispatch } from 'react-redux';

import './ingredient-controls.scss';
import {
	addIngredient,
	removeIngredient,
} from '../../store/modules/customBurger';

interface Props {
	ingredients: any[];
	type?: 'vegetarian' | 'non-vegetarian';
}

const IngredientControls: React.FC<Props> = ({
	ingredients,
	type = 'non-vegetarian',
}) => {
	const dispatch = useDispatch();

	return (
		<div className='ingredient-controls'>
			{ingredients.map((ingredient: any) => {
				if (ingredient.foodType === type || ingredient.foodType === 'none') {
					return (
						<IngredientControl
							addIngredient={() => {
								dispatch(addIngredient({ ingredient }));
							}}
							removeIngredient={() => {
								dispatch(removeIngredient({ ingredient }));
							}}
							key={ingredient._id}
							ingredient={ingredient}
						/>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
};

export default IngredientControls;
