import { OrderItem } from '@burger-house/models';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { SERVER_URL } from  '../../config/constants'
import './order-list-item.scss';

interface OrderListItemProps {
	orderItem: OrderItem;
}

const OrderListItem: React.FC<OrderListItemProps> = ({ orderItem }) => {
	return (
		<>
			<div className='order-list-item'>
				<div className='order-list-item__image'>
					<figure>
						<LazyLoadImage
							effect='blur'
							src={orderItem.photoUrl.startsWith('/uploads') ? `${SERVER_URL}${orderItem.photoUrl}` : orderItem.photoUrl}
							alt={orderItem.name}
							loading='lazy'
						/>
					</figure>
				</div>
				<h4 className='order-list-item__name'>{orderItem.name}</h4>
				<p className='order-list-item__price'>
					Rs {orderItem.price} ({orderItem.itemsInCart})
				</p>
				<div className='order-list-item__ingredients'>
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
