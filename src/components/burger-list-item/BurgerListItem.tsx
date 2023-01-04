import React from 'react';
import classes from './burger-list-item.module.scss';

import { FiTrash2 } from 'react-icons/fi';
import { CartBurger } from '../../store/types';
import { useDispatch } from 'react-redux';
import {
	addBurgerToCart,
	removeBurgerFromCart,
	removeBurgerInstancesFromCart,
} from '../../store/modules/cart';
import Image from 'next/image';
import IconButton from '../shared/icon-button';
import AddRemoveButton from '../shared/add-remove-button';
import Logo from '../shared/logo';

interface BurgerListItemProps {
	burger: CartBurger;
}

const BurgerListItem: React.FC<BurgerListItemProps> = ({ burger }) => {
	const dispatch = useDispatch();

	return (
		<>
			<div className={classes['burger-list-item']}>
				<div className={classes['burger-list-item__image']}>
					<figure>
						{burger?.photo?.url ? (
							<Image
								height={500}
								width={500}
								src={burger.photo?.url}
								alt={burger.name}
								loading='lazy'
							/>
						) : (
							<Logo size='lg' />
						)}
					</figure>
				</div>
				<h4 className={classes['burger-list-item__name']}>{burger.name}</h4>
				<p className={classes['burger-list-item__price']}>
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
						className={classes['burger-list-item__delete-btn']}>
						<FiTrash2 size={16} className='u-text-danger' />
					</IconButton>
				</>

				<div className={classes['burger-list-item__ingredients']}>
					{burger?.ingredients?.map((item: any, i: number) => {
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