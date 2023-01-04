import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import classes from './scss/button.module.scss';

const variants = {
  primary: classes.primary,
  'primary-outline': classes['primary--outline'],
  tertiary: classes.tertiary,
  'tertiary-outline': classes['tertiary--outline'],
  success: classes.success,
  'success-outline': classes['success--outline'],
  danger: classes.danger,
  'danger-outline': classes['danger--outline'],
  dark: classes.dark,
  'dark-outline': classes['dark--outline'],
};

const sizes = {
  sm: classes.sm,
  md: classes.md,
  lg: classes.lg,
};

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLink?: boolean;
  href?: string;
};

const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLink = false,
  className,
  disabled,
  href,
  ...props
}) => {
  const template = (
    <button
      disabled={disabled}
      className={clsx([
        classes.root,
        sizes[size],
        variants[variant],
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );

  if (isLink && href) {
    return (
      <Link href={href} passHref>
        {template}
      </Link>
    );
  }

  return template;
};

export default Button;
