import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CartListItem from "../../Cart/components/CartListItem";

import Loader from "./../../shared/components/Loader/Loader";
import * as userActions from "./../../store/actions/userActions";
import * as orderActions from "./../../store/actions/orderActions";
import * as adminActions from "./../../store/actions/adminActions";
import TrackOrder from "./TrackOrder";

const UserOrderDetail = (props) => {
	const { admin } = props;

	const dispatch = useDispatch();
	const order = useSelector((state) => state.user.userOrder);
	const orderInit = useSelector((state) => state.user.userOrderInit);
	const params = useParams();
	const history = useHistory();

	const [showMap, setShowMap] = useState(false);

	useEffect(() => {
		dispatch(orderActions.resetOrderStatus());
		dispatch(userActions.getUserOrder(params.id));
	}, [dispatch, params]);

	const cancelUserOrder = () => {
		dispatch(userActions.updateUserOrder(params.id));
	};

	const markAsDelivered = () => {
		dispatch(
			adminActions.updateOrderStatusAdmin(params.id, { status: "delivered" })
		);
	};

	const markAsPending = () => {
		dispatch(
			adminActions.updateOrderStatusAdmin(params.id, { status: "pending" })
		);
	};

	if (orderInit) {
		return <Loader fullScreen />;
	}

	return (
		<>
			{<TrackOrder order={order} showMap={showMap} setShowMap={setShowMap} />}
			<div className='order-detail-page'>
				<button
					type='button'
					onClick={() => history.goBack()}
					className='btn btn__back u-text-tertiary order-detail-page__btn'>
					Go Back
				</button>
				<div className='order-detail-page__list'>
					{order &&
						order.items.map((el) => {
							return <CartListItem hidebtn key={el._id} burger={el} />;
						})}
				</div>
				<div className='order-stats'>
					{admin && (
						<div className='order-stats-item'>
							<span className='order-stats-item__field'>Customer: </span>
							<span className='order-stats-item__value u-text-capitalize'>
								{order && order.user.name}
							</span>
						</div>
					)}
					<div className='order-stats-item'>
						<span className='order-stats-item__field'>Ordered On:</span>
						<span className='order-stats-item__value'>
							{order && `${order.createdAt}`.split("T")[0]}
						</span>
					</div>
					<div className='order-stats-item'>
						<span className='order-stats-item__field'>Total Price:</span>
						<span className='order-stats-item__value'>
							Rs {order && order.price}
						</span>
					</div>
					<div className='order-stats-item'>
						<span className='order-stats-item__field'>Order Status: </span>
						<span
							className={`order-stats-item__value u-text-uppercase 
					${order && order.status === "pending" && "u-text-danger"}
					${order && order.status === "delivered" && "u-text-success"}
					${order && order.status === "cancelled" && "u-text-dark"}
				`}>
							{order && order.status}
						</span>
					</div>
				</div>
				<div className='order-detail-page__cta'>
					{!admin && (
						<button
							onClick={cancelUserOrder}
							disabled={order && order.status === "pending" ? false : true}
							type='button'
							className={`btn btn__danger--outline 
					${
						((order && order.status) === "cancelled" ||
							(order && order.status) === "delivered") &&
						"btn__disabled--outline"
					}
					`}>
							Cancel Order
						</button>
					)}
					{!admin && (
						<button
							disabled={order && order.status === "pending" ? false : true}
							onClick={() => setShowMap(true)}
							type='button'
							className={`btn btn__tertiary--outline
				 	${
						((order && order.status === "cancelled") ||
							(order && order.status === "delivered")) &&
						"btn__disabled--outline"
					}
				 `}>
							Track Order
						</button>
					)}

					{admin && (
						<button
							onClick={markAsDelivered}
							disabled={order && order.status === "pending" ? false : true}
							type='button'
							className={`btn btn__success--outline 
					${
						((order && order.status) === "cancelled" ||
							(order && order.status) === "delivered") &&
						"btn__disabled--outline"
					}
					`}>
							Mark As Delivered
						</button>
					)}
					{admin && (
						<button
							onClick={markAsPending}
							type='button'
							disabled={order && order.status === "delivered" ? false : true}
							className={`btn btn__danger--outline
				 	${
						((order && order.status === "cancelled") ||
							(order && order.status === "pending")) &&
						"btn__disabled--outline"
					}
				 `}>
							Mark As Pending
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default UserOrderDetail;
