import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import OrderListItem from '../components/OrderListItem/OrderListItem';
import Loader from './../../shared/components/Loader/Loader';

import * as adminActions from './../../store/actions/adminActions';

import { useHistory, useRouteMatch } from 'react-router-dom';

const ManageUserOrders = () => {
	const dispatch = useDispatch();
	const route = useRouteMatch();
	const [filter, setFilter] = useState();
	const orders = useSelector((state) => state.admin.allOrders);
	const orderStats = useSelector((state) => state.admin.orderStats);
	const orderStatsInit = useSelector((state) => state.admin.orderStatsInit);
	const ordersInit = useSelector((state) => state.admin.allOrdersInit);
	const [totalOrders, setTotalOrders] = useState('calculating...');
	const [totalPrice, setTotalPrice] = useState('calculating...');

	const user = useSelector((state) => state.auth.user);
	const history = useHistory();

	useEffect(() => {
		if (user && user.role !== 'admin') {
			return history.replace('/dashboard');
		}
	}, [history, user]);

	useEffect(() => {
		let filterObj;
		if (filter) {
			filterObj = { status: filter };
		}
		dispatch(adminActions.getAllOrdersAdmin(filterObj));
		dispatch(adminActions.getAllOrdersStatsAdmin());
	}, [dispatch, filter]);

	useEffect(() => {
		if (orderStats) {
			let totalOrders = 0;
			let totalAmount = 0;
			if (orderStats.delivered.length) {
				totalOrders += orderStats.delivered[0].total;
				totalAmount += orderStats.delivered[0].price;
			}
			if (orderStats.pending.length) {
				totalOrders += orderStats.pending[0].total;
				totalAmount += orderStats.pending[0].price;
			}
			if (orderStats.cancelled.length) {
				totalOrders += orderStats.cancelled[0].total;
				totalAmount += orderStats.cancelled[0].price;
			}
			setTotalOrders(totalOrders);
			setTotalPrice(totalAmount);
		}
	}, [orderStats]);

	if (ordersInit || orderStatsInit) {
		return <Loader fullScreen />;
	}

	return (
		<div className='admin-user-orders'>
			<h3 className='heading-1 u-text-primary'>Manage Orders</h3>

			<div className='admin-user-orders__stats'>
				<div className='user-orders-stats'>
					<div className='card-stats'>
						<h3 className='u-text-tertiary'>Total</h3>
						<p>Rs {totalPrice}</p>
					</div>
				</div>

				<div className='user-orders-stats'>
					<div className='card-stats'>
						<h3>Total Orders</h3>
						<p>{totalOrders}</p>
					</div>
				</div>

				<div className='user-orders-stats'>
					<div className='card-stats'>
						<h3 className='u-text-success'>Delivered Orders</h3>
						<p>
							{orderStats && orderStats.delivered.length
								? orderStats.delivered[0].total
								: 0}
						</p>
					</div>
				</div>

				<div className='user-orders-stats'>
					<div className='card-stats'>
						<h3 className='u-text-dark'>Cancelled Orders</h3>
						<p>
							{orderStats && orderStats.cancelled.length
								? orderStats.cancelled[0].total
								: 0}
						</p>
					</div>
				</div>

				<div className='user-orders-stats'>
					<div className='card-stats'>
						<h3 className='u-text-danger'>Pending Orders</h3>
						<p>
							{orderStats && orderStats.pending.length
								? orderStats.pending[0].total
								: 0}
						</p>
					</div>
				</div>
			</div>

			<div className='form__group admin-user-orders__filter'>
				<select
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className='form__input'>
					<option value=''>---</option>
					<option value='pending'>Pending</option>
					<option value='delivered'>Delivered</option>
					<option value='cancelled'>Cancelled</option>
				</select>
			</div>

			<ul className='admin-user-orders__list'>
				{orders
					.map((order) => {
						return (
							<OrderListItem
								onClick={() => history.push(`${route.path}/${order._id}`)}
								key={order._id}
								order={order}
							/>
						);
					})
					.reverse()}
			</ul>
		</div>
	);
};

export default ManageUserOrders;
