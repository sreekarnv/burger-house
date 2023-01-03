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
			<div className={classes['order-info-card']}>
				<table className={classes['order-info-card__table']}>
					<thead className={classes['order-info-card__head']}>
						<tr>
							{showUser && (
								<th className={classes['order-info-card__head__row']}>User</th>
							)}
							<th className={classes['order-info-card__head__row']}>
								Ordered at
							</th>
							<th className={classes['order-info-card__head__row']}>Status</th>
						</tr>
					</thead>
					<tbody className={classes['order-info-card__body']}>
						<tr>
							{showUser && (
								<td className={classes['order-info-card__body__row']}>
									<div>
										<div className='u-text-capitalize'>
											{(order.user as any).name}
										</div>
										<a
											href={`mailto:${(order.user as any).email}`}
											className='u-block u-fs-13 u-text-primary'>
											{(order.user as any).email}
										</a>
									</div>
								</td>
							)}
							<td className={classes['order-info-card__body__row']}>
								{formatDistanceToNow(new Date(order.createdAt))} ago
							</td>
							<td
								className={clsx([
									classes['order-info-card__body__row'],
									'u-text-uppercase',
									order.status === 'delivered' && 'u-text-success',
									order.status === 'pending' && 'u-text-danger',
								])}>
								{order.status}
							</td>
						</tr>
					</tbody>
				</table>

				<div className={classes['order-info-card__cta']}>{cta}</div>
			</div>
		</>
	);
};

export default OrderInfoCard;
