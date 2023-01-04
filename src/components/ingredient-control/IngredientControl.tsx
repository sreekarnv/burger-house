import Image from 'next/image';
import React from 'react';
import { Ingredient } from '../../server/models/ingredient.model';
import { useAppDispatch } from '../../store/hooks';
import AddRemoveButton from '../shared/add-remove-button';
import {
  addIngredient,
  removeIngredient,
} from '../../store/modules/customBurger';
import classes from './ingredient-control.module.scss';
import clsx from 'clsx';

interface IngredientControlProps {
  ingredient: Ingredient & { amount?: number };
}

const IngredientControl: React.FC<IngredientControlProps> = ({
  ingredient,
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
          <Image
            height={40}
            width={40}
            src={ingredient.photo}
            alt={ingredient.name}
          />
          <p className={clsx([classes.text, 'u-text-capitalize'])}>
            {ingredient.name}
          </p>
        </div>
        <AddRemoveButton
          leftOnClick={() => dispatch(addIngredient({ ingredient }))}
          rightOnClick={() => dispatch(removeIngredient({ ingredient }))}
        >
          {ingredient.amount || 0}
        </AddRemoveButton>
      </div>
    </>
  );
};

export default IngredientControl;
