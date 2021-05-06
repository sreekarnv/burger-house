import './order-item.scss';

import * as React from 'react';

import { Order } from '~@types/orders';

const MONTHS = [
	'Jan',
	'Feb',
	'March',
	'April',
	'May',
	'June',
	'July',
	'Augu',
	'Sept',
	'Oct',
	'Nov',
	'Dec',
];

interface Props {
	order: Order;
	onClick: any;
}

const OrderItem: React.FC<Props> = ({ order, onClick }: any) => {
	return (
		<div className='order-item' {...{ onClick }}>
			<div className='order-item__date'>
				<span>{new Date(order.createdAt).getDate()}</span>&nbsp;
				<span>{MONTHS[new Date(order.createdAt).getMonth()]}</span>&nbsp;
				<span>{new Date(order.createdAt).getFullYear()}</span>
			</div>
			<p className='order-item__id'>#{order._id}</p>
			<h3 className='order-item__price'>Rs {order.price}</h3>
			<p className={`order-item__status order-item__status--${order.status}`}>
				{order.status}
			</p>
		</div>
	);
};

export default OrderItem;
