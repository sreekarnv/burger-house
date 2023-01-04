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

interface SkeletonTextProps {
  numberOfLines?: number;
  variant?: 'text' | 'title';
  align?: 'left' | 'center' | 'right';
}

const SkeletonText: React.FC<SkeletonTextProps> = ({
  numberOfLines = 1,
  variant = 'text',
  align = 'center',
}) => {
  return (
    <>
      {Array(numberOfLines)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={clsx(classes.animationRoot)}>
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className={classes.animationElement}
            />
            <div
              className={clsx(classes.root, classes[variant], classes[align])}
            />
          </div>
        ))}
    </>
  );
};

export default SkeletonText;
