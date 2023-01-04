import clsx from 'clsx';
import React from 'react';
import classes from './heading.module.scss';

const variants = {
  h1: classes['h1'],
  h2: classes['h2'],
  h3: classes['h3'],
};

const textColor = {
  primary: 'u-text-primary',
  secondary: 'u-text-secondary',
  tertiary: 'u-text-tertiary',
  dark: 'u-text-dark',
  white: 'u-text-white',
};

interface HeadingProps extends React.PropsWithChildren {
  className?: string;
  variant?: keyof typeof variants;
  color?: keyof typeof textColor;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  variant = 'h1',
  color = 'dark',
}) => {
  switch (variant) {
    case 'h1':
      return (
        <h1 className={clsx([classes.h1, textColor[color], className])}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={clsx([classes.h2, textColor[color], className])}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={clsx([classes.h3, textColor[color], className])}>
          {children}
        </h3>
      );
    default:
      return (
        <h1 className={clsx([classes.h1, textColor[color], className])}>
          {children}
        </h1>
      );
  }
};

export default Heading;
