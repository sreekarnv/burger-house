import clsx from 'clsx';
import React from 'react';

import classes from './scss/skeleton.module.scss';

import { motion, Variants } from 'framer-motion';

const variants: Variants = {
  initial: {
    x: '-150%',
  },
  animate: {
    x: ['-150%', '60%', '150%'],
    transition: {
      duration: 0.7,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

interface SkeletonImageProps {
  height: number | string;
  width?: number | string;
  removeMargins?: boolean;
  rounded?: boolean;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  height,
  width,
  rounded = false,
  removeMargins = false,
}) => {
  return (
    <>
      <div className={clsx(classes.animationRoot)}>
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          className={classes.animationElement}
        />
        <div
          style={{ height, width }}
          className={clsx([
            classes.root,
            !removeMargins && classes.imageMargin,
            rounded && classes.avatar,
          ])}
        />
      </div>
    </>
  );
};

export default SkeletonImage;
