import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderListItem from '../components/OrderListItem/OrderListItem';
import Loader from '../../Shared/Components/Loader/Loader';

import * as userActions from './../../store/actions/userActions';

import { useHistory, useRouteMatch } from 'react-router-dom';

const UserOrders = (props) => {
	const dispatch = useDispatch();
	const route = useRouteMatch();
	const orders = useSelector((state) => state.user.userOrders);
	const ordersInit = useSelector((state) => state.user.userOrdersInit);

	useEffect(() => {
		dispatch(userActions.getUserOrders());
	}, [dispatch]);

	const history = useHistory();

	if (ordersInit) {
		return <Loader fullScreen />;
	}

	return (
		<div className='user-orders'>
			<h3 className='heading-1 u-text-primary'>My Orders</h3>
			<ul className='user-orders__list'>
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

export default UserOrders;
