import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';
import useActiveLink from '../../../hooks/use-active-link';

import classes from './scss/nav-link.module.scss';

interface NavLinkProps extends LinkProps {
  label: string;
  children: React.FC<{ size: number }>;
  variant?: 'default' | 'logout';
  showBadge?: boolean;
  badgeValue?: string | number;
  exact?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  children: Icon,
  label,
  variant = 'default',
  showBadge,
  badgeValue,
  exact,
  ...props
}) => {
  const { isActive } = useActiveLink(props.href, exact);

  return (
    <li className={classes.item}>
      <Link
        className={clsx([
          classes.root,
          variant === 'logout' && classes.logout,
          isActive && classes.active,
        ])}
        {...props}
      >
        <div className={classes.icon}>
          <Icon size={22} />
        </div>
        <small className={classes.label}>{label}</small>
      </Link>
      {showBadge && <span className={classes.badge}>{badgeValue}</span>}
    </li>
  );
};

export default NavLink;
