import React, { useEffect } from "react";
import { connect } from "react-redux";

import CartListItem from "./components/CartListItem";

import * as cartActions from "./../store/actions/cartActions";
import { useHistory } from "react-router-dom";
import * as orderActions from "../store/actions/orderActions";

import Loader from "./../shared/components/Loader/Loader";

const Cart = (props) => {
	const {
		cart,
		addBurgerToCart,
		removeBurgerFromCart,
		cartPrice,
		cartValue,
		removeAllBurgersFromCart,
		clearCart,
		user,
		placeOrder,
		newOrder,
		placeOrderStatus,
		placeOrderInit,
	} = props;

	const history = useHistory();

	useEffect(() => {
		if (placeOrderStatus === "success" && newOrder) {
			clearCart(cart);
			return history.replace(`/dashboard/orders/${newOrder._id}`);
		}
	}, [
		placeOrderStatus,
		history,
		removeAllBurgersFromCart,
		clearCart,
		newOrder,
		cart,
	]);

	const placeOrderHandler = () => {
		const data = {
			price: cartPrice,
			items: [...cart],
		};

		placeOrder(data);
	};

	if (placeOrderInit) {
		return <Loader fullScreen />;
	}

	return (
		<div className='cart'>
			{cartValue > 0 && (
				<h3 className='heading-1 cart__heading  u-text-primary'>Cart</h3>
			)}
			{cartValue > 0 && (
				<div className='cart__list'>
					{cart.map((burger) => {
						return (
							<CartListItem
								addBurger={addBurgerToCart}
								removeBurger={removeBurgerFromCart}
								key={burger.id}
								burger={burger}
								removeAll={removeAllBurgersFromCart}
							/>
						);
					})}
				</div>
			)}

			{cartValue > 0 && (
				<div className='cart__total'>
					<h2 className='u-text-primary heading-2 u-text-center'>Total Cost</h2>
					<p className='cart__total-price'>Rs {cartPrice}</p>
					{user && (
						<button
							onClick={placeOrderHandler}
							className='btn btn__dark--outline btn__sm u-text-uppercase'>
							Place Order
						</button>
					)}

					{!user && (
						<button
							onClick={() => history.push("/login")}
							className='btn btn__dark--outline btn__sm u-text-uppercase'>
							Please login to place your Order
						</button>
					)}
				</div>
			)}

			{cartValue === 0 && (
				<div className='cart__empty'>
					<h5 className='heading-1 cart__heading u-text-uppercase u-text-tertiary'>
						Your Cart is Empty.
					</h5>
					<button
						onClick={() => history.push("/menu")}
						className='btn btn__primary--outline'>
						Order Now
					</button>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		cart: state.cart.cart,
		cartPrice: state.cart.cartPrice,
		cartValue: state.cart.cartValue,
		user: state.auth.user,
		placeOrderStatus: state.orders.placeOrderStatus,
		placeOrderInit: state.orders.placeOrderInit,
		newOrder: state.orders.newOrder,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addBurgerToCart: (burger) => dispatch(cartActions.addBurgerToCart(burger)),
		removeBurgerFromCart: (burger) =>
			dispatch(cartActions.removeBurgerFromCart(burger)),
		removeAllBurgersFromCart: (burger) =>
			dispatch(cartActions.removeAllBurgersFromCart(burger)),
		placeOrder: (data) => dispatch(orderActions.placeOrder(data)),
		clearCart: (cartData) => dispatch(cartActions.clearCart(cartData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
