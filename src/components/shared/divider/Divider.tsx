import classes from './divider.module.scss';
import clsx from 'clsx';

import React from 'react';

const colors = {
  primary: classes.primary,
  secondary: classes.secondary,
};

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  color: keyof typeof colors;
};

const Divider: React.FC<Props> = ({ color, className, ...props }) => {
  return (
    <div
      className={clsx([classes.root, colors[color], className])}
      {...props}
    />
  );
};

export default Divider;
