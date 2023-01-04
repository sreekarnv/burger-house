import classes from './home-gurantee.module.scss';
import * as React from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import clsx from 'clsx';

const Gurantee: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.root}>
      <HiCheckCircle size={20} />
      <p className={clsx([classes.text, 'u-fw-600'])}>{children}</p>
    </div>
  );
};

export default Gurantee;
