import clsx from 'clsx';
import React from 'react';
import classes from './switch.module.scss';

interface SwitchProps {
  onToggle: () => void;
  className?: string;
  active: boolean;
}

const Switch: React.FC<SwitchProps> = React.memo(
  ({ active, onToggle, className }) => {
    return (
      <>
        <label
          className={clsx([
            classes.root,
            active && classes['root--active'],
            className,
          ])}
          onClick={() => {
            onToggle();
          }}
        >
          <div className={classes.slider}></div>
        </label>
      </>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
