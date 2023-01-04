import classes from './icon-button.module.scss';

import * as React from 'react';
import clsx from 'clsx';

const sizes = {
  sm: classes.sm,
  lg: classes.lg,
};

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizes;
};

const IconButton: React.FC<Props> = ({
  children,
  size = 'sm',
  className,
  ...props
}) => {
  return (
    <button className={clsx([classes.root, sizes[size], className])} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
