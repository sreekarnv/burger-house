import classes from './loader.module.scss';

import * as React from 'react';

const Loader: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = () => {
  return (
    <div className={classes['lds-ellipsis']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
