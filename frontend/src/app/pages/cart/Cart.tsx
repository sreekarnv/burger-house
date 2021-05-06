import './cart.scss';

import * as React from 'react';
import * as cartActions from '~app/store/actions/cartActions';

import { useDispatch, useSelector } from 'react-redux';

import { Burger } from '~@types/burger';
import BurgerListItem from '~app/components/shared/BurgerListItem/BurgerListItem';
import Button from '~app/components/shared/ui/button/Button';
import { ReduxState } from '~@types/store';
import { User } from '~@types/user';
import useCreateOrderMutation from '~app/hooks/api/mutations/useCreateOrderMutation';
import { useHistory } from 'react-router';
import { useQueryClient } from 'react-query';

const Cart = () => {
	const { push } = useHistory();
	const client = useQueryClient();
	const { placeOrder, isLoading, data: orderData } = useCreateOrderMutation({});
	const user = client.getQueryData<User>('user');
	const dispatch = useDispatch();
	const cartItems = useSelector((state: ReduxState) => state.cart.cart);
	const cartPrice = useSelector((state: ReduxState) => state.cart.cartPrice);
	const cartValue = useSelector((state: ReduxState) => state.cart.cartValue);

	React.useEffect(() => {
		1;
		if (orderData) {
			push(`/dashboard/me/orders/${orderData._id}`);
			dispatch(cartActions.clearCart(cartItems));
		}
	}, [orderData, dispatch, cartItems, cartActions]);

	return (
		<div className={cartValue === 0 ? 'cart__empty' : 'cart'}>
			{cartValue === 0 ? (
				<>
					<h1 className='heading-1 u-text-primary u-text-center u-text-uppercase'>
						Your Cart is empty
					</h1>
					<Button
						onClick={() => push('/menu')}
						color='tertiary'
						variant='outlined'>
						Check Menu
					</Button>
				</>
			) : (
				<>
					<h1 className='heading-1 cart__heading u-text-primary'>Cart</h1>
					<div className='cart__list'>
						{cartItems?.map((burger: Burger) => {
							return (
								<BurgerListItem key={burger._id || burger.id} {...{ burger }} />
							);
						})}
					</div>
					<div className='cart__total'>
						<h2 className='u-text-primary heading-2 u-text-center'>
							Total Cost
						</h2>
						<p className='cart__total-price'>Rs {cartPrice}</p>
						{user ? (
							<Button
								onClick={() => {
									const data = {
										price: cartPrice,
										items: [...cartItems],
									};
									placeOrder(data);
								}}
								className='u-w-100 u-text-uppercase'
								variant='outlined'>
								{isLoading ? 'Loading....' : 'Place Order'}
							</Button>
						) : (
							<Button
								onClick={() => push('/auth/login')}
								className='u-w-100 u-text-uppercase'
								variant='outlined'>
								Please Login to order
							</Button>
						)}
					</div>
					<div className='cart__mobile-cta'>
						<h1 className='u-text-tertiary u-text-center'>
							Total Rs {cartPrice}
						</h1>
						{user ? (
							<Button
								onClick={() => {
									const data = {
										price: cartPrice,
										items: [...cartItems],
									};
									placeOrder(data);
								}}
								className='u-text-uppercase'
								size='sm'
								variant='outlined'>
								{isLoading ? 'Loading....' : 'Place Order'}
							</Button>
						) : (
							<Button
								onClick={() => push('/auth/login')}
								className='u-text-uppercase'
								size='sm'
								variant='outlined'>
								Please Login to order
							</Button>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
