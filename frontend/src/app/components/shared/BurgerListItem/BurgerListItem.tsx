import './burger-list-item.scss';

import * as React from 'react';
import * as cartActions from '~app/store/actions/cartActions';

import AddRemoveBtn from '~app/components/shared/ui/add-remove-btn/AddRemoveBtn';
import { Burger } from '~@types/burger';
import IconButton from '~app/components/shared/ui/icon-button/IconButton';
import Logo from '~app/components/shared/ui/logo/Logo';
import TrashIcon from '~app/components/shared/ui/icons/TrashIcon';
import { useDispatch } from 'react-redux';

interface Props {
	burger: Burger;
}

const BurgerListItem: React.FC<Props> = ({ burger }) => {
	const dispatch = useDispatch();

	return (
		<div className='burger-list-item'>
			<div className='burger-list-item__image'>
				{burger.photoUrl ? (
					<img
						src={process.env.REACT_APP_SERVER_URL + burger.photoUrl}
						alt='item'
					/>
				) : (
					<Logo size='lg' />
				)}
			</div>
			<h4 className='burger-list-item__name'>{burger.name}</h4>
			<p className='burger-list-item__price'>
				Rs {burger.price * burger.itemsInCart!}
			</p>

			<>
				<AddRemoveBtn
					className='u-jc-center'
					leftOnClick={() => dispatch(cartActions.addBurgerToCart(burger))}
					rightOnClick={() =>
						dispatch(cartActions.removeBurgerFromCart(burger))
					}>
					{burger.itemsInCart}
				</AddRemoveBtn>
				<IconButton
					onClick={() => dispatch(cartActions.removeAllBurgersFromCart(burger))}
					className='burger-list-item__delete-btn'>
					<TrashIcon className='u-text-danger' />
				</IconButton>
			</>

			<div className='burger-list-item__ings'>
				{burger.name?.toLowerCase().startsWith('custom') &&
					burger.ingredients.map((ing: any) => {
						if (ing.items > 0) {
							return (
								<p key={ing.id}>
									{ing.name} x {ing.items}
								</p>
							);
						}

						return null;
					})}
			</div>
		</div>
	);
};

export default BurgerListItem;
