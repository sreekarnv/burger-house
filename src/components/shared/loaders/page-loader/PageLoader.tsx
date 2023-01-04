import clsx from 'clsx';
import React from 'react';
import Logo from '../../logo/Logo';
import Loader from '../default';
import classes from './page-loader.module.scss';

const variants = {
  full: classes.full,
  embed: classes.embed,
};

interface PageLoaderProps {
  variant?: keyof typeof variants;
}

const PageLoader: React.FC<PageLoaderProps> = ({ variant = 'full' }) => {
  return (
    <>
      <div className={clsx(classes.root, variants[variant])}>
        <Logo size="lg" />
        <div className="u-text-center u-mt-10">
          <Loader />
        </div>
      </div>
    </>
  );
};

export default PageLoader;
