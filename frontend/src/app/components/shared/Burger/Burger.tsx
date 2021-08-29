import './burger.scss';

import * as React from 'react';

import Ingredient from 'src/app/components/shared/Ingredient/Ingredient';
import { Ingredient as IngredientType } from 'src/@types/ingredient';

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
