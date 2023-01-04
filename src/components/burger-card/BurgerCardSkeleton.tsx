import React from 'react';
import { SkeletonImage, SkeletonText } from '../shared/skeleton';

import classes from './burger-card.module.scss';

interface BurgerCardSkeletonProps {
  imageH?: number | string;
  numberOfLines?: number;
}

const BurgerCardSkeleton: React.FC<BurgerCardSkeletonProps> = ({
  imageH = 250,
  numberOfLines = 5,
}) => {
  return (
    <>
      <div className={classes.root}>
        <SkeletonImage height={imageH} />

        <div className={classes.content}>
          <SkeletonText variant="title" />
          <SkeletonText numberOfLines={numberOfLines} />
        </div>

        <div className={classes.cta}>
          <SkeletonText variant="title" />
        </div>
      </div>
    </>
  );
};

export default BurgerCardSkeleton;
