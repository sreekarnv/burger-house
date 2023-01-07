import clsx from 'clsx';
import React from 'react';
import classes from './heading.module.scss';

const variants = {
  h1: classes['h1'],
  h2: classes['h2'],
  h3: classes['h3'],
};

const aligns = {
  left: 'u-text-left',
  center: 'u-text-center',
  right: 'u-text-right',
};

const weights = {
  regular: 'u-fw-400',
  bold: 'u-fw-600',
};

const textColor = {
  primary: 'u-text-primary',
  secondary: 'u-text-secondary',
  tertiary: 'u-text-tertiary',
  dark: 'u-text-dark',
  white: 'u-text-white',
};

const transform = {
  uppercase: 'u-text-uppercase',
  capitalize: 'u-text-capitalize',
};
interface HeadingProps extends React.PropsWithChildren {
  className?: string;
  variant?: keyof typeof variants;
  component?: keyof typeof variants;
  color?: keyof typeof textColor;
  align?: keyof typeof aligns;
  weight?: keyof typeof weights;
  textTransform?: keyof typeof transform;
  hasMarginBottom?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  variant = 'h1',
  component = 'h1',
  color = 'dark',
  align = 'center',
  weight = 'bold',
  textTransform = 'capitalize',
  hasMarginBottom,
}) => {
  const classNames = [
    className,
    transform[textTransform],
    textColor[color],
    variants[variant],
    aligns[align],
    weights[weight],
    hasMarginBottom && classes.mb,
  ];

  switch (component) {
    case 'h1':
      return <h1 className={clsx(classNames)}>{children}</h1>;
    case 'h2':
      return <h2 className={clsx(classNames)}>{children}</h2>;
    case 'h3':
      return <h3 className={clsx(classNames)}>{children}</h3>;
    default:
      return <h1 className={clsx(classNames)}>{children}</h1>;
  }
};

export default Heading;
