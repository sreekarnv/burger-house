import clsx from 'clsx';
import React from 'react';
import classes from './order-stat-card.module.scss';

interface OrderStatCardProps {
  title: string;
  value: number;
}

const OrderStatCard: React.FC<OrderStatCardProps> = ({ title, value }) => {
  return (
    <>
      <div className={classes.root}>
        <h5
          className={clsx([
            classes.title,
            'u-text-uppercase u-fw-700',
            title === 'delivered' && 'u-text-success',
            title === 'pending' && 'u-text-danger',
            title === 'total' && 'u-text-tertiary',
          ])}
        >
          {title} Orders
        </h5>
        <p className={clsx(classes.content, 'u-text-primary')}>{value}</p>
      </div>
    </>
  );
};

export default OrderStatCard;
