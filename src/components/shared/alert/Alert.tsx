import classes from './scss/alert.module.scss';

import { HiOutlineXCircle } from 'react-icons/hi';
import * as React from 'react';
import clsx from 'clsx';

const positions = {
  'bottom-right': classes['bottom-right'],
  'top-center': classes['top-center'],
};

const types = {
  success: classes.success,
  danger: classes.danger,
};

const darkTypes = {
  success: classes['success--dark'],
  danger: classes['danger--dark'],
};

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  type?: keyof typeof types;
  position?: keyof typeof positions;
  variant?: 'default' | 'dark';
};

const Alert: React.FC<Props> = ({
  children,
  position = 'bottom-right',
  type = 'success',
  variant = 'default',
  ...props
}) => {
  return (
    <div
      className={clsx([
        classes.root,
        positions[position],
        variant === 'default' && types[type],
        variant === 'dark' && darkTypes[type],
        'u-text-capitalize',
      ])}
      {...props}
    >
      <HiOutlineXCircle className={classes.icon} />
      <p className={clsx([classes.text])}>{children}</p>
    </div>
  );
};

export default Alert;
