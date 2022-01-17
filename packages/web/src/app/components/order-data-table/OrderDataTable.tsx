import clsx from 'clsx';
import React from 'react';
import { PaginatedOrders } from '../../hooks/api/types';
import Button from '../shared/ui/button/Button';
import format from 'date-fns/format';

import './order-data-table.scss';

interface OrderDataTableProps {
	data: PaginatedOrders;
	linkUrl: string;
	glass?: boolean;
	nextPage: () => void;
	previousPage: () => void;
	page: number;
}

const LIMIT = 12;

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
					'order-data-table',
					'u-w-100',
					glass && 'order-data-table--glass',
				])}>
				<thead>
					<tr className='order-data-table__heading__row'>
						<th className='order-data-table__heading'>Order ID</th>
						<th className='order-data-table__heading'>Order Date</th>
						<th className='order-data-table__heading'>Order Total (Rs)</th>
						<th className='order-data-table__heading'>Order Status</th>
						<th />
					</tr>
				</thead>

				<tbody className='order-data-table__body'>
					{data?.orders?.map((order) => (
						<tr className='order-data-table__body__row' key={order._id}>
							<td>{order._id}</td>
							<td>{format(new Date(order.createdAt), 'MM/dd/yyyy')}</td>
							<td>{order.price}</td>
							<td
								className={clsx([
									'order-data-table__body__status',
									order.status === 'pending' &&
										'order-data-table__body__status--pending',
									order.status === 'delivered' &&
										'order-data-table__body__status--delivered',
									order.status === 'cancelled' &&
										'order-data-table__body__status--cancelled',
								])}>
								{order.status}
							</td>
							<td>
								<Button isLink to={`${linkUrl}/${order._id}`} size='sm'>
									View
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className='u-mt-20 u-text-center'>
				<Button
					disabled={page === 1 && LIMIT > data?.orders.length}
					variant='tertiary-outline'
					size='sm'
					onClick={() => {
						previousPage();
					}}>
					Prev Page
				</Button>
				<span className='u-mr-5 u-ml-5 u-fw-600 u-fs-18'>{page}</span>
				<Button
					disabled={page === 1 && LIMIT > data?.orders.length}
					variant='tertiary-outline'
					size='sm'
					onClick={() => {
						nextPage();
					}}>
					Next Page
				</Button>
			</div>
		</>
	);
};

export default OrderDataTable;
