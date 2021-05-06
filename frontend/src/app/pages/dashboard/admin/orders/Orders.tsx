import './orders.scss';

import * as React from 'react';

import Loader from '~app/components/shared/ui/loader/loader';
import Option from '~app/components/shared/ui/form/Select/Option';
import { Order } from '~@types/orders';
import OrderAdminStatCard from '~app/components/dashboard/orders/OrderAdminStatCard/OrderAdminStatCard';
import OrderItem from '~app/components/dashboard/orders/OrderItem/OrderItem';
import Select from '~app/components/shared/ui/form/Select/Select';
import useAdminOrdersQuery from '~app/hooks/api/queries/useAdminOrdersQuery';
import useAdminOrderstatsQuery from '~app/hooks/api/queries/useAdminOrderStatsQuery';
import { useHistory } from 'react-router';

interface Props {}

const Orders: React.FC<Props> = (props) => {
	const { push } = useHistory();
	const [filter, setFilter] = React.useState('');
	const [orders, setOrders] = React.useState<Order[]>([]);
	const { isLoading, data: orderStats } = useAdminOrderstatsQuery({});
	const { isLoading: ordersLoading, data } = useAdminOrdersQuery({});

	React.useEffect(() => {
		if (data?.length) {
			setOrders(data);
		}
	}, [data]);

	React.useEffect(() => {
		if (!filter?.length) {
			setOrders(data);
		} else {
			const filteredOrders: Order[] = [...data].filter(
				(el: Order) => el.status === filter
			);
			setOrders(filteredOrders);
		}
	}, [filter, data]);

	if (isLoading) {
		return <Loader fullScreen />;
	}

	return (
		<div className='orders-admin'>
			<h1 className='heading-2 u-text-center u-text-capitalize u-text-primary u-mb-12'>
				Manage Orders
			</h1>
			<div className='orders-admin__stats u-mb-18'>
				<OrderAdminStatCard
					fieldClassName='u-text-tertiary'
					field='total'
					value={`Rs ${
						(orderStats?.pending?.price || 0) +
						orderStats?.delivered.price +
						orderStats?.cancelled.price
					}`}
				/>
				<OrderAdminStatCard
					fieldClassName='u-text-black'
					field='total orders'
					value={
						orderStats?.delivered.total +
						orderStats?.cancelled.total +
						(orderStats?.pending?.total || 0)
					}
				/>
				<OrderAdminStatCard
					fieldClassName='u-text-success'
					field='delivered orders'
					value={orderStats?.delivered.total}
				/>
				<OrderAdminStatCard
					fieldClassName='u-text-dark'
					field='cancelled orders'
					value={orderStats?.cancelled.total}
				/>
				<OrderAdminStatCard
					fieldClassName='u-text-danger'
					field='pending orders'
					value={orderStats?.pending?.total || 0}
				/>
			</div>
			<div className='orders-admin__list'>
				<div className='orders-admin__list-filter'>
					<Select onChange={(e) => setFilter(e.target.value)}>
						<Option value=''>-</Option>
						<Option value='cancelled'>Cancelled</Option>
						<Option value='delivered'>Delivered</Option>
						<Option value='pending'>Pending</Option>
					</Select>
				</div>
				<div className='orders-admin__list-items'>
					{ordersLoading && (
						<h5 className='heading-3 u-text-center u-text-primary'>
							Loading...
						</h5>
					)}
					{orders?.map((order: any) => {
						if (!filter.length) {
							return (
								<OrderItem
									key={order._id}
									onClick={() => push(`/dashboard/admin/orders/${order._id}`)}
									{...{ order }}
								/>
							);
						} else {
							if (order.status === filter) {
								return (
									<OrderItem
										key={order._id}
										onClick={() => push(`/dashboard/admin/orders/${order._id}`)}
										{...{ order }}
									/>
								);
							} else {
								return null;
							}
						}
					})}
					{!orders?.length && (
						<h5 className='u-text-center u-text-danger heading-3 u-text-capitalize'>
							No {filter} Orders
						</h5>
					)}
				</div>
			</div>
		</div>
	);
};

export default Orders;
