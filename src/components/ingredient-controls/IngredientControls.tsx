import React from 'react';

import IngredientControl from '../ingredient-control';

import classes from './ingredient-controls.module.scss';

import clsx from 'clsx';
import { Ingredient } from '../../server/models/ingredient.model';

interface Props {
  ingredients: (Ingredient & { amount: number })[];
  className?: string;
  type?: 'vegetarian' | 'non-vegetarian';
}

const IngredientControls: React.FC<Props> = ({
  ingredients,
  type = 'non-vegetarian',
  className,
}) => {
  return (
    <div className={clsx([classes.root, className])}>
      {ingredients.map((ingredient) => {
        if (ingredient.foodType === type || ingredient.foodType === 'none') {
          return (
            <IngredientControl key={ingredient._id} ingredient={ingredient} />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default IngredientControls;
