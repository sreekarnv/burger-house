import clsx from 'clsx';
import { useRouter } from 'next/router';
import BurgerListItem from '../../components/burger-list-item/BurgerListItem';
import Button from '../../components/shared/button';
import Heading from '../../components/shared/heading';
import BaseLayout from '../../layouts/base-layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart } from '../../store/modules/cart';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

import classes from './cart.module.scss';

const CartPage: NextPageWithLayout = ({}) => {
	const router = useRouter();
	const context = trpc.useContext();
	const cartItems = useAppSelector((state) => state.cart.items);
	const cartValue = useAppSelector((state) => state.cart.value);
	const cartPrice = useAppSelector((state) => state.cart.price);
	const user = context.auth.user.getData();
	const dispatch = useAppDispatch();

	const { mutate: createOrder, isLoading } = trpc.order.create.useMutation({
		onSuccess() {
			dispatch(clearCart());
			router.replace('/dashboard');
		},
	});

	return (
		<>
			<div className={classes['cart']}>
				{cartValue > 0 ? (
					<>
						<div className={classes['cart__content']}>
							<div className={classes['cart__content__header']}>
								<Heading variant='h3' color='dark'>
									Your Cart{' '}
									<span className='u-text-primary'>({cartValue})</span>{' '}
								</Heading>
							</div>
							<ul className={classes['cart__content__list']}>
								{cartItems?.map((burger) => {
									return <BurgerListItem key={burger._id} burger={burger} />;
								})}
							</ul>
						</div>

						<div className={classes['cart__total']}>
							<div>
								<div className={classes['cart__total__header']}>
									<Heading
										className={classes['cart__total__heading']}
										color='dark'
										variant='h3'>
										Cart Total
									</Heading>
								</div>
								<ul className={classes['cart__total__details']}>
									<li className={classes['cart__total__item']}>
										<h3 className='u-fw-400 u-text-primary'>Subtotal</h3>
										<h2 className='u-text-tertiary'>Rs {cartPrice}</h2>
									</li>
									<li className={classes['cart__total__item']}>
										<h3 className='u-fw-400 u-text-primary'>Tax</h3>
										<h2 className='u-text-tertiary'>Rs 30</h2>
									</li>
								</ul>
							</div>
							<div className={classes['cart__total__cta__container']}>
								<div className={clsx([classes['cart__total__cta']])}>
									<h2>Total</h2>
									<h1 className='u-text-tertiary'>Rs {cartPrice + 30}</h1>
								</div>
								<div className={classes['cart__total__btn']}>
									{user ? (
										<Button
											onClick={async () => {
												const items = [] as any;

												cartItems.forEach((item, i) => {
													const ingredients = [...item.ingredients];

													console.log(ingredients);

													let itemIngredients = ingredients;

													if (item.photo?.url) {
														itemIngredients = ingredients.map(
															(ingredient: any, i) => {
																return {
																	...ingredient.ingredient,
																	amount: ingredient.amount,
																};
															}
														);
													}

													items.push({
														itemsInCart: item.itemsInCart,
														photoUrl: item.photo?.url ?? '/burgers/default.svg',
														name: item.name,
														isVegetarian: item.isVegetarian,
														price: item.price,
														ingredients: itemIngredients,
													});
												});

												return createOrder({
													items,
													price: cartPrice,
												});
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
											href='/auth/login?redirect=/cart'>
											Login To Place Order
										</Button>
									)}
								</div>
							</div>
						</div>
					</>
				) : (
					<div className={clsx([classes['cart__empty'], 'u-text-center'])}>
						<Heading
							className={clsx(
								classes['cart__empty__heading'],
								'u-text-uppercase'
							)}
							variant='h1'
							color='primary'>
							Your Cart is empty
						</Heading>
						<Button isLink href='/menu' variant='tertiary'>
							Check Menu
						</Button>
					</div>
				)}
			</div>
		</>
	);
};

CartPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default CartPage;
