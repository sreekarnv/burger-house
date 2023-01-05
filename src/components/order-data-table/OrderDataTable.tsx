import clsx from 'clsx';
import React from 'react';
import format from 'date-fns/format';

import classes from './order-data-table.module.scss';
import Button from '../shared/button';
import Pagination from '../shared/pagination';

interface OrderDataTableProps {
  data: any;
  linkUrl: string;
  glass?: boolean;
  nextPage: () => void;
  previousPage: () => void;
  page: number;
}

const OrderDataTable: React.FC<OrderDataTableProps> = ({
  data,
  linkUrl,
  glass,
  page,
  nextPage,
  previousPage,
}) => {
  return (
    <>
      <table
        className={clsx([
          classes['order-data-table'],
          glass && classes['order-data-table--glass'],
        ])}
      >
        <thead>
          <tr className={classes['order-data-table__heading__row']}>
            <th className={classes['order-data-table__heading']}>Order ID</th>
            <th className={classes['order-data-table__heading']}>Order Date</th>
            <th className={classes['order-data-table__heading']}>
              Order Total (Rs)
            </th>
            <th className={classes['order-data-table__heading']}>
              Order Status
            </th>
            <th />
          </tr>
        </thead>

        <tbody className={classes['order-data-table__body']}>
          {data?.orders?.map((order: any) => (
            <tr
              className={classes['order-data-table__body__row']}
              key={order._id}
            >
              <td>{order._id}</td>
              <td>{format(new Date(order.createdAt), 'MM/dd/yyyy')}</td>
              <td>{order.price}</td>
              <td
                className={clsx([
                  classes['order-data-table__body__status'],
                  order.status === 'pending' &&
                    classes['order-data-table__body__status--pending'],
                  order.status === 'delivered' &&
                    classes['order-data-table__body__status--delivered'],
                  order.status === 'cancelled' &&
                    classes['order-data-table__body__status--cancelled'],
                ])}
              >
                {order.status}
              </td>
              <td>
                <Button isLink href={`${linkUrl}/${order._id}`} size="sm">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        className={classes.pagination}
        handleNextPage={nextPage}
        handlePrevPage={previousPage}
        page={page}
        prevDisabled={page === 1}
        nextDisabled={!data.hasMore}
        hasMore={data.hasMore}
      />
    </>
  );
};

export default OrderDataTable;
