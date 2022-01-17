import { Burger, Ingredient } from '@burger-house/models';
import clsx from 'clsx';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import useAlert from '../../hooks/helpers/useAlert';
import { useAppSelector } from '../../store/hooks';
import {
	addBurgerToCart,
	removeBurgerFromCart,
} from '../../store/modules/cart';
import AddRemoveButton from '../shared/ui/add-remove-button/AddRemoveButton';
import Alert from '../shared/ui/alert/Alert';
import Button from '../shared/ui/button/Button';
import './burger-card.scss';

const sizes = {
	md: 'burger-card--md',
	sm: 'burger-card--sm',
};

interface BurgerCardProps {
	burger: Burger;
	size?: keyof typeof sizes;
}

const BurgerCard: React.FC<BurgerCardProps> = ({ burger, size = 'md' }) => {
	const dispatch = useDispatch();
	const cartBurger = useAppSelector((state) => state.cart.items).find(
		(el) => el._id === burger._id
	);
	const { alertType, setAlert, showAlert, alertMessage } = useAlert();

	return (
		<>
			{showAlert && (
				<Alert position='bottom-right' type={alertType}>
					{alertMessage}
				</Alert>
			)}
			<div className={clsx(['burger-card', sizes[size]])}>
				<figure className='burger-card__media'>
					<LazyLoadImage
						src={burger.photo.url}
						alt={burger.name}
						loading='lazy'
						effect='blur'
					/>
				</figure>
				<div className='burger-card__content'>
					<h3 className='burger-card__title'>{burger.name}</h3>
					<ul className='burger-card__ingredients'>
						{burger.ingredients.map(({ amount, ingredient }, i) => {
							return (
								<li key={i}>
									<p>
										<span className='u-text-capitalize'>
											{ingredient?.valueOf().hasOwnProperty('name')
												? (ingredient as Ingredient).name
												: ingredient}
										</span>
										<span>({amount})</span>
									</p>
								</li>
							);
						})}
					</ul>
					<div className='burger-card__cta'>
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

						<h6 className='burger-card__price'>Rs {burger.price}</h6>
					</div>
				</div>
			</div>
		</>
	);
};

export default BurgerCard;
