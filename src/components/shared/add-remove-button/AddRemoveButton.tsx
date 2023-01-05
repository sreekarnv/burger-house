import classes from './add-remove-button.module.scss';
import { FiPlus, FiMinus } from 'react-icons/fi';
import clsx from 'clsx';
import * as React from 'react';
import IconButton from '../icon-button';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  leftOnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  rightOnClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const AddRemoveButton: React.FC<Props> = ({
  leftOnClick,
  rightOnClick,
  className,
  ...props
}) => {
  return (
    <div className={clsx([classes.root, className])}>
      <IconButton aria-label="add one item" onClick={leftOnClick}>
        <FiPlus className="u-text-dark" />
      </IconButton>
      <p className={classes.text}>{props.children}</p>
      <IconButton aria-label="remove one item" onClick={rightOnClick}>
        <FiMinus className="u-text-dark" />
      </IconButton>
    </div>
  );
};

export default AddRemoveButton;
