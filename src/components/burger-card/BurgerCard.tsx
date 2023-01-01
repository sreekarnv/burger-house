import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import useAlert from '../../hooks/use-alert';
import type { Burger } from '../../server/models/burger.model';
import type { Ingredient } from '../../server/models/ingredient.model';
import AddRemoveButton from '../shared/add-remove-button';
import Alert from '../shared/alert';
import Button from '../shared/button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	addBurgerToCart,
	removeBurgerFromCart,
} from '../../store/modules/cart';
import classes from './burger-card.module.scss';

const sizes = {
	default: '',
	sm: classes.sm,
};

interface BurgerCardProps {
	burger: Burger;
	size?: keyof typeof sizes;
}

const BurgerCard: React.FC<BurgerCardProps> = ({
	burger,
	size = 'default',
}) => {
	const dispatch = useAppDispatch();
	const cartBurger = useAppSelector((state) => state.cart.items).find(
		(item) => item._id === burger._id
	);
	const { alertType, setAlert, showAlert, alertMessage } = useAlert();

	return (
		<>
			{showAlert && (
				<Alert position='bottom-right' type={alertType}>
					{alertMessage}
				</Alert>
			)}
			<div className={clsx([classes.root, sizes[size]])}>
				<div
					className={clsx([
						classes.badge,
						burger.isVegetarian ? 'u-text-success' : 'u-text-danger',
					])}>
					<span></span>
				</div>
				<figure className={classes.media}>
					<Image
						src={burger.photo.url}
						alt={burger.name}
						loading='lazy'
						height={1000}
						width={1000}
					/>
				</figure>
				<div className={classes.content}>
					<p className={classes.title}>{burger.name}</p>
					<ul className={classes.ingredients}>
						{burger.ingredients.map(({ amount, ingredient }, i) => {
							return (
								<li key={i}>
									<p>
										<span className='u-text-capitalize'>
											{ingredient?.valueOf().hasOwnProperty('name')
												? (ingredient as Ingredient).name
												: null}
										</span>
										<span>({amount})</span>
									</p>
								</li>
							);
						})}
					</ul>
					<div className={classes.cta}>
						<div>
							{cartBurger ? (
								<AddRemoveButton
									className='u-jc-center'
									leftOnClick={() => {
										dispatch(addBurgerToCart({ burger }));
										setAlert('success', 'Added burger to cart');
									}}
									rightOnClick={() => {
										dispatch(removeBurgerFromCart({ burger }));
										setAlert('danger', 'Removed burger from cart');
									}}>
									{cartBurger?.itemsInCart}
								</AddRemoveButton>
							) : (
								<Button
									onClick={() => {
										dispatch(addBurgerToCart({ burger }));
										setAlert('success', 'Added burger to cart');
									}}
									size='sm'
									variant='primary-outline'>
									Add to Cart
								</Button>
							)}
						</div>

						<p className={classes.price}>Rs {burger.price}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default BurgerCard;
