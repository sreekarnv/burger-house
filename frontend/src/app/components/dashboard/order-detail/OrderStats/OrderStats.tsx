import './order-stats.scss';

import * as React from 'react';

import { Order } from '~@types/orders';
import OrderStatsItem from './OrderStatsItem/OrderStatsItem';

interface Props {
	order: Order;
	isAdmin?: boolean;
}

const OrderStats: React.FC<Props> = ({ order, isAdmin }) => {
	const date = new Date(order?.createdAt!);

	return (
		<div className={`order-stats order-stats--admin`}>
			{isAdmin ? (
				<>
					<OrderStatsItem
						field='Customer'
						valueClassName='u-text-capitalize'
						value={order?.user.name}
					/>
					<OrderStatsItem
						field='Ordered On'
						value={`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
					/>
					<OrderStatsItem
						field='Total Price'
						valueClassName='u-ftwt-700 u-text-primary'
						value={`Rs ${order?.price}`}
					/>
					<OrderStatsItem
						field='Order Status'
						valueClassName={`u-text-uppercase 
					${order?.status === 'pending' && 'u-text-danger'}
					${order?.status === 'delivered' && 'u-text-success'}
					${order?.status === 'cancelled' && 'u-text-dark'}`}
						value={order?.status}
					/>
				</>
			) : (
				<>
					<OrderStatsItem
						field='Ordered On'
						value={`${order?.createdAt}`.split('T')[0]}
					/>
					<OrderStatsItem field='Total Price:' value={`Rs ${order?.price}`} />
					<OrderStatsItem
						field='Order Status:'
						valueClassName={`u-text-uppercase 
					${order?.status === 'pending' && 'u-text-danger'}
					${order?.status === 'delivered' && 'u-text-success'}
					${order?.status === 'cancelled' && 'u-text-dark'}`}
						value={`${order?.status}`}
					/>
				</>
			)}
		</div>
	);
};

export default OrderStats;
