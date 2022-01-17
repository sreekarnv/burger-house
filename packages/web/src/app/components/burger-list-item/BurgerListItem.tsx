import React from 'react';
import AddRemoveButton from '../shared/ui/add-remove-button/AddRemoveButton';
import IconButton from '../shared/ui/icon-button/IconButton';
import './burger-list-item.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { FiTrash2 } from 'react-icons/fi';
import { CartBurger } from '../../store/types';
import { useDispatch } from 'react-redux';
import {
	addBurgerToCart,
	removeBurgerFromCart,
	removeBurgerInstancesFromCart,
} from '../../store/modules/cart';
import Logo from '../shared/ui/logo/Logo';

interface BurgerListItemProps {
	burger: CartBurger;
}

const BurgerListItem: React.FC<BurgerListItemProps> = ({ burger }) => {
	const dispatch = useDispatch();

	return (
		<>
			<div className='burger-list-item'>
				<div className='burger-list-item__image'>
					<figure>
						{burger?.photo?.url ? (
							<LazyLoadImage
								effect='blur'
								src={burger.photo?.url}
								alt={burger.name}
								loading='lazy'
							/>
						) : (
							<Logo size='lg' />
						)}
					</figure>
				</div>
				<h4 className='burger-list-item__name'>{burger.name}</h4>
				<p className='burger-list-item__price'>
					Rs {burger.price * burger.itemsInCart}
				</p>

				<>
					<AddRemoveButton
						className='u-jc-center'
						leftOnClick={() => {
							dispatch(addBurgerToCart({ burger }));
						}}
						rightOnClick={() => {
							dispatch(removeBurgerFromCart({ burger }));
						}}>
						{burger.itemsInCart}
					</AddRemoveButton>
					<IconButton
						onClick={() => {
							dispatch(removeBurgerInstancesFromCart({ burger }));
						}}
						className='burger-list-item__delete-btn'>
						<FiTrash2 size={16} className='u-text-danger' />
					</IconButton>
				</>

				<div className='burger-list-item__ingredients'>
					{burger?.ingredients?.map((item: any, i) => {
						if (item.amount > 0) {
							return (
								<p key={i}>
									{item?.ingredient?.name || item?.name || ''} x{' '}
									{item?.amount || 0}
								</p>
							);
						}
						return null;
					})}
				</div>
			</div>
		</>
	);
};

export default BurgerListItem;
