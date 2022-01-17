import './burger.scss';

import * as React from 'react';
import { Ingredient as IngredientType } from '@burger-house/models';
import Ingredient from '../ingredient/Ingredient';

interface Props {
	ingredients: IngredientType[];
}

const Burger: React.FC<Props> = ({ ingredients }) => {
	return (
		<div className='burger'>
			<div className='burger-top-bun'></div>
			{ingredients.map(({ display }: any, i: number) => {
				return (
					<Ingredient
						key={i}
						height={`${display.height}rem`}
						color={display.color}
					/>
				);
			})}
			<div className='burger-bottom-bun'></div>
		</div>
	);
};

export default Burger;
