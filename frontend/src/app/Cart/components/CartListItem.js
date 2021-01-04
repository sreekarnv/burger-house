import React from 'react';
import IconButton from '../../Shared/Components/Buttons/IconButton';
import AddOrRemoveButton from '../../Shared/Components/Buttons/AddorRemoveButton';

import TrashIcon from '../../Shared/Icons/Trash';

import BaseListItem from '../../Shared/Components/BaseListItem/BaseListItem';

import Logo from '../../Shared/Icons/Logo';

const CartListItem = (props) => {
	const { burger, addBurger, removeBurger, removeAll, hidebtn } = props;

	return (
		<BaseListItem
			className={`cart__list-item ${hidebtn && 'cart__list-item-sm'}`}>
			<div className='cart__list-item-image'>
				{burger.photoUrl && <img src={burger.photoUrl} alt='item' />}
				{!burger.photoUrl && <Logo />}
			</div>

			<h4 className='cart__list-item-name'>
				{burger.name} ({burger.itemsInCart})
			</h4>

			<p className='cart__list-item-price'>
				{!hidebtn && `Rs ${burger.price * burger.itemsInCart}`}
				{hidebtn && `Rs ${burger.price} `}
			</p>

			{!hidebtn && (
				<AddOrRemoveButton
					addItem={() => addBurger(burger)}
					removeItem={() => removeBurger(burger)}>
					{burger.itemsInCart}
				</AddOrRemoveButton>
			)}
			{!hidebtn && (
				<IconButton
					onClick={() => removeAll(burger)}
					className='cart__list-item-delete-btn'>
					<TrashIcon className='u-fill-danger-60' />
				</IconButton>
			)}

			{burger.name.startsWith('Custom') &&
				burger.ingredients.map((el) => {
					if (el.items > 0) {
						return (
							<p key={el.name} className='cart__list-item-ings'>
								{el.name} X {el.items}
							</p>
						);
					} else {
						return null;
					}
				})}
		</BaseListItem>
	);
};

export default CartListItem;
