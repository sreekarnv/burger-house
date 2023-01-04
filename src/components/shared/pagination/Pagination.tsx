import clsx from 'clsx';
import React from 'react';
import Button from '../button';

import classes from './pagination.module.scss';

interface PaginationProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  page: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  hasMore: boolean;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  hasMore,
  handleNextPage,
  handlePrevPage,
  className,
  prevDisabled,
  nextDisabled,
  ...props
}) => {
  return (
    <>
      <div className={clsx(classes.root, className)} {...props}>
        <Button
          variant="tertiary-outline"
          size="sm"
          disabled={page === 1 || prevDisabled}
          onClick={() => {
            if (page !== 1 || !prevDisabled) {
              handlePrevPage();
            }
          }}
        >
          Prev Page
        </Button>
        <span className={classes.text}>{page}</span>
        <Button
          disabled={!hasMore || nextDisabled}
          variant="tertiary-outline"
          size="sm"
          onClick={() => {
            if (hasMore || !nextDisabled) {
              handleNextPage();
            }
          }}
        >
          Next Page
        </Button>
      </div>
    </>
  );
};

export default Pagination;
