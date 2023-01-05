import classes from './sidebar-nav-link.module.scss';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import useActiveLink from '../../../hooks/use-active-link';

interface Props {
  href: string;
  className?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  children: React.ReactNode;
  exact?: boolean;
}

const SidebarNavLink: React.FC<Props> = ({
  href,
  className,
  children,
  icon,
  onClick,
  exact,
}) => {
  const { isActive } = useActiveLink(href, exact);

  return (
    <li>
      <Link
        className={clsx([
          classes['sidebar-nav-link'],
          isActive && classes['sidebar-nav-link--active'],
          className,
        ])}
        href={href}
        {...{ onClick }}
      >
        <span className={classes['sidebar-nav-link__icon']}>{icon}</span>
        <span className={classes['sidebar-nav-link__text']}>{children}</span>
      </Link>
    </li>
  );
};

export default SidebarNavLink;
