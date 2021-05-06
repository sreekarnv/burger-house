import './order-cta.scss';

import * as React from 'react';

import Button from '~app/components/shared/ui/button/Button';
import { Order } from '~@types/orders';
import useUpdateOrderMutation from '~app/hooks/api/mutations/useUpdateOrderMutation';

interface Props {
	order: Order;
	onTrackOrder: () => void;
	isAdmin?: boolean;
}

const OrderCta: React.FC<Props> = ({ order, onTrackOrder, isAdmin }) => {
	const { isLoading, updateOrderStatus } = useUpdateOrderMutation({});

	const user = (
		<>
			<Button
				className='u-text-capitalize'
				onClick={() => {
					if (order?.status === 'pending') {
						updateOrderStatus({ id: order._id, status: 'cancelled' });
					}
				}}
				disabled={order?.status !== 'pending'}
				color='danger'
				variant='outlined'>
				{isLoading ? 'Loading...' : 'Cancel Order'}
			</Button>
			<Button
				onClick={() => {
					if (order?.status === 'pending') {
						onTrackOrder();
					}
				}}
				disabled={order?.status !== 'pending'}
				color='tertiary'
				variant='solid'>
				{isLoading ? 'Loading...' : 'Track Order'}
			</Button>
		</>
	);

	const admin = (
		<>
			<Button
				className='u-text-capitalize'
				onClick={() => {}}
				disabled={order?.status === 'pending' || order?.status === 'cancelled'}
				color='danger'
				variant='outlined'>
				{isLoading ? 'Loading...' : 'mark as pending'}
			</Button>
			<Button
				className='u-text-capitalize'
				onClick={() => {}}
				disabled={
					order?.status === 'delivered' || order?.status === 'cancelled'
				}
				color='success'
				variant='outlined'>
				{isLoading ? 'Loading...' : 'mark as delivered'}
			</Button>
		</>
	);

	return <div className='order-detail__cta'>{isAdmin ? admin : user}</div>;
};

export default OrderCta;
