import classes from './burger.module.scss';

import React from 'react';
import Ingredient from '../ingredient';
import clsx from 'clsx';
import { BurgerIngredient } from '../../server/models/burger.model';

interface Props {
  ingredients: BurgerIngredient[];
  className?: string;
}

const Burger: React.FC<Props> = ({ ingredients, className }) => {
  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes['top-bun']}></div>
      {ingredients.map(({ display }: any, i: number) => {
        return (
          <Ingredient
            key={i}
            height={`${display.height}rem`}
            color={display.color}
          />
        );
      })}
      <div className={classes['bottom-bun']}></div>
    </div>
  );
};

export default Burger;
