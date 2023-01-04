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
      <div className={classes['order-list-item']}>
        <div className={classes['order-list-item__image']}>
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
        <h4 className={classes['order-list-item__name']}>{orderItem.name}</h4>
        <p className={classes['order-list-item__price']}>
          Rs {orderItem.price} ({orderItem.itemsInCart})
        </p>
        <div className={classes['order-list-item__ingredients']}>
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
