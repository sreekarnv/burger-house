import classes from './ingredient.module.scss';

import React from 'react';
import clsx from 'clsx';

interface Props {
  height: string | number;
  color: string;
}

const Ingredient: React.FC<Props> = (props) => {
  const { height, color } = props;

  return (
    <div
      className={clsx([classes.root])}
      style={{ height, width: '100%', backgroundColor: color }}
    ></div>
  );
};

export default Ingredient;
