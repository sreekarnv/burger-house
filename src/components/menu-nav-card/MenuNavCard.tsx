import classes from './menu-nav-card.module.scss';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type Props = React.RefAttributes<HTMLAnchorElement> & {
  veg?: boolean;
  children?: React.ReactNode;
  className?: string;
  to: string;
};

const MenuNavCard: React.FC<Props> = (props) => {
  const { className, veg, to } = props;

  return (
    <Link
      href={to}
      passHref
      className={clsx([
        classes.root,
        veg ? classes['root--veg'] : classes['root--non-veg'],
        className,
      ])}
    >
      <p>{veg ? 'Vegetarian' : 'Non Vegetarian'}</p>
    </Link>
  );
};

export default MenuNavCard;
