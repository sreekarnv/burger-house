import clsx from 'clsx';
import React from 'react';
import './order-stat-card.scss';

interface OrderStatCardProps {
	title: string;
	value: number;
}

const OrderStatCard: React.FC<OrderStatCardProps> = ({ title, value }) => {
	return (
		<>
			<div className='order-stat-card u-text-center u-p-8'>
				<h5
					className={clsx([
						'order-stat-card__title u-text-uppercase u-fw-700',
						title === 'delivered' && 'u-text-success',
						title === 'pending' && 'u-text-danger',
						title === 'total' && 'u-text-tertiary',
					])}>
					{title} Orders
				</h5>
				<p className='order-stat-card__content u-text-primary'>{value}</p>
			</div>
		</>
	);
};

export default OrderStatCard;
