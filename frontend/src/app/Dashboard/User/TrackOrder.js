import React from 'react';
import { useDispatch } from 'react-redux';
import Backdrop from '../../Shared/Components/Backdrop/Backdrop';
import Map from '../components/Map/Map';

import * as userActions from './../../store/actions/userActions';

const TrackOrder = (props) => {
	const { showMap, setShowMap, order } = props;
	const dispatch = useDispatch();

	const changeStatusHandler = () => {
		let status = 'pending';

		if (order.status === 'pending') status = 'delivered';

		dispatch(userActions.updateUserOrder(order._id, status));
	};

	return (
		<>
			<Backdrop show={showMap} closeHandler={() => setShowMap(false)} />
			<div
				className={`track-order ${
					showMap ? 'track-order--show' : 'track-order--hide'
				}`}>
				{showMap && (
					<Map order={order} onChangeStatusHandler={changeStatusHandler} />
				)}
			</div>
		</>
	);
};

export default TrackOrder;
