import Image from 'next/image';
import React from 'react';
import { OrderItem } from '../../server/models/order.model';
import classes from './order-list-item.module.scss';

interface OrderListItemProps {
  orderItem: OrderItem;
}

const OrderListItem: React.FC<OrderListItemProps> = ({ orderItem }) => {
  return (
    <>
      <div className={classes.root}>
        <div className={classes.image}>
          <figure>
            <Image
              height={100}
              width={100}
              src={
                orderItem.photoUrl.startsWith('/uploads')
                  ? `${orderItem.photoUrl}`
                  : orderItem.photoUrl
              }
              alt={orderItem.name}
              loading="lazy"
            />
          </figure>
        </div>
        <h2 className={classes.name}>{orderItem.name}</h2>
        <p className={classes.price}>
          Rs {orderItem.price} ({orderItem.itemsInCart})
        </p>
        <div className={classes.ingredients}>
          {orderItem?.ingredients?.map((item: any, i) => {
            if (item.amount > 0) {
              return (
                <p key={i}>
                  {item.name} x {item.amount}
                </p>
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default OrderListItem;
