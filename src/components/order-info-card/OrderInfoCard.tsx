import clsx from 'clsx';
import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import classes from './order-info-card.module.scss';
import { Order } from '../../server/models/order.model';

interface OrderInfoCardProps {
  order: Order;
  cta: React.ReactNode;
  showUser?: boolean;
}

const OrderInfoCard: React.FC<OrderInfoCardProps> = ({
  order,
  cta,
  showUser,
}) => {
  return (
    <>
      <div className={classes.root}>
        <table className={classes.table}>
          <thead className={classes.head}>
            <tr>
              {showUser && <th className={classes['head-row']}>User</th>}
              <th className={classes['head-row']}>Ordered at</th>
              <th className={classes['head-row']}>Status</th>
            </tr>
          </thead>
          <tbody className={classes.body}>
            <tr>
              {showUser && (
                <td className={classes['body-row']}>
                  <div>
                    <div className="u-text-capitalize">
                      {(order.user as any).name}
                    </div>
                    <a
                      href={`mailto:${(order.user as any).email}`}
                      className="u-block u-fs-13 u-text-primary"
                    >
                      {(order.user as any).email}
                    </a>
                  </div>
                </td>
              )}
              <td className={classes['body-row']}>
                {formatDistanceToNow(new Date(order.createdAt))} ago
              </td>
              <td
                className={clsx([
                  classes['body-row'],
                  'u-text-uppercase',
                  order.status === 'delivered' && 'u-text-dark',
                  order.status === 'pending' && 'u-text-danger',
                ])}
              >
                {order.status}
              </td>
            </tr>
          </tbody>
        </table>

        <div className={classes.cta}>{cta}</div>
      </div>
    </>
  );
};

export default OrderInfoCard;
