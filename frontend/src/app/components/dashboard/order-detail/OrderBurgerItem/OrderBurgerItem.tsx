import './order-burger-item.scss';

import { Burger, OrderIngredient } from 'src/@types/burger';

import Logo from 'src/app/components/shared/ui/logo/Logo';
import React from 'react';
import useDynamicImage from 'src/app/hooks/useDynamicImage';

interface Props {
	burger: Burger;
}

const OrderBurgerItem: React.FC<Props> = ({ burger }) => {
	const { imageRef } = useDynamicImage(
		process.env.REACT_APP_SERVER_URL! + burger.photoUrl
	);

	return (
		<div className='order-burger-item'>
			<div className='order-burger-item__image'>
				{burger.photoUrl ? (
					<img ref={imageRef} alt={burger.name} />
				) : (
					<Logo size='lg' />
				)}
			</div>
			<h5 className='order-burger-item__name'>
				{burger?.name} ({burger?.itemsInCart})
			</h5>
			<h5 className='order-burger-item__price'>Rs {burger?.price}</h5>

			<div className='order-burger-item__ings'>
				{burger.ingredients.map((ingredient: OrderIngredient) => {
					if (ingredient.items > 0) {
						return (
							<p key={ingredient._id}>
								{ingredient.name} x {ingredient.items}
							</p>
						);
					} else {
						return null;
					}
				})}
			</div>
		</div>
	);
};

export default OrderBurgerItem;
