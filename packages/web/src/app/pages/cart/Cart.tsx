import { User } from '@burger-house/models';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BurgerListItem from '../../components/burger-list-item/BurgerListItem';
import Seo from '../../components/shared/meta/Seo';
import Button from '../../components/shared/ui/button/Button';
import useCreateOrderMutation from '../../hooks/api/mutations/orders/useCreateOrderMutation';
import { useAppSelector } from '../../store/hooks';
import { clearCart } from '../../store/modules/cart';

import './cart.scss';

interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = ({}) => {
	const queryClient = useQueryClient();
	const cartItems = useAppSelector((state) => state.cart.items);
	const cartValue = useAppSelector((state) => state.cart.value);
	const cartPrice = useAppSelector((state) => state.cart.price);
	const user = queryClient.getQueryData<User>('user');
	const dispatch = useDispatch();
	const { createOrder, isLoading } = useCreateOrderMutation();
	const navigate = useNavigate();

	return (
		<>
			<Seo title='Burger House | Cart' />
			<>
				<div className='cart'>
					{cartValue > 0 ? (
						<>
							<div className='cart__content'>
								<div className='cart__content__header'>
									<h1 className='u-text-dark heading-3'>
										Your Cart{' '}
										<span className='u-ml-3 u-text-primary'>({cartValue})</span>{' '}
									</h1>
								</div>
								<ul className='cart__content__list'>
									{cartItems?.map((burger) => {
										return <BurgerListItem key={burger._id} burger={burger} />;
									})}
								</ul>
							</div>

							<div className='cart__total u-bg-light'>
								<div>
									<div className='cart__total__header'>
										<h1 className='u-text-center heading-3 u-text-dark'>
											Cart Total
										</h1>
									</div>
									<ul className='cart__total__details'>
										<li className='cart__total__item'>
											<h3 className='u-fw-400 u-text-primary'>Subtotal</h3>
											<h2 className='u-text-tertiary'>Rs {cartPrice}</h2>
										</li>
										<li className='cart__total__item'>
											<h3 className='u-fw-400 u-text-primary'>Tax</h3>
											<h2 className='u-text-tertiary'>Rs 30</h2>
										</li>
									</ul>
								</div>
								<div className='u-pl-10 u-pr-10 u-pb-4'>
									<div className='cart__total__cta u-mb-10'>
										<h2>Total</h2>
										<h1 className='u-text-tertiary'>Rs {cartPrice + 30}</h1>
									</div>
									<div className='u-text-center'>
										{user ? (
											<Button
												onClick={async () => {
													await createOrder({
														items: cartItems as any,
														price: cartPrice,
													});
													dispatch(clearCart({}));
													navigate('/dashboard/orders');
												}}
												className='u-w-100'
												variant='primary-outline'>
												{isLoading ? 'Loading...' : 'Place Order'}
											</Button>
										) : (
											<Button
												className='u-w-100'
												variant='primary-outline'
												isLink
												to='/auth/login?redirect=/cart'>
												Login To Place Order
											</Button>
										)}
									</div>
								</div>
							</div>
						</>
					) : (
						<div className='cart__empty u-text-center'>
							<h1 className='heading-1 u-text-primary u-mb-8 u-text-center u-text-uppercase'>
								Your Cart is empty
							</h1>
							<Button isLink to='/menu' variant='tertiary'>
								Check Menu
							</Button>
						</div>
					)}
				</div>
			</>
		</>
	);
};

export default CartPage;
