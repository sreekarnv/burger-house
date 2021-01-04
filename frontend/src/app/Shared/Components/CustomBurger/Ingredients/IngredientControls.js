import React from 'react';
import { useDispatch } from 'react-redux';

import IngredientControl from './IngredientControl';

import * as customBurgerActions from '../../../../store/actions/customBurgerActions';

const IngredientControls = (props) => {
	const { ingredients } = props;

	const dispatch = useDispatch();

	const addIngredient = (ing) => {
		dispatch(customBurgerActions.addIngredient(ing));
	};

	const removeIngredient = (ing) => {
		dispatch(customBurgerActions.removeIngredient(ing));
	};

	return (
		<>
			<div className='ingredient-controls'>
				{ingredients.map((ingredient) => {
					return (
						<IngredientControl
							addIngredient={() => addIngredient(ingredient)}
							removeIngredient={() => removeIngredient(ingredient)}
							key={ingredient._id}
							ingredient={ingredient}
						/>
					);
				})}
			</div>
		</>
	);
};

export default IngredientControls;
