import * as React from 'react';
import * as customBurgerActions from 'src/app/store/actions/customBurgerActions';

import { Ingredient } from 'src/@types/ingredient';
import IngredientControl from './IngredientControl/IngredientControl';
import { useDispatch } from 'react-redux';

interface Props {
	ingredients: Ingredient[];
	type?: 'vegetarian' | 'non-vegetarian';
}

const IngredientControls = ({
	ingredients,
	type = 'non-vegetarian',
}: Props) => {
	const dispatch = useDispatch();
	const { addIngredient, removeIngredient } = customBurgerActions;

	return (
		<div className='ingredient-controls'>
			{ingredients.map((ingredient: Ingredient) => {
				if (ingredient.foodType === type || ingredient.foodType === 'none') {
					return (
						<IngredientControl
							addIngredient={() => dispatch(addIngredient(ingredient))}
							removeIngredient={() => dispatch(removeIngredient(ingredient))}
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
