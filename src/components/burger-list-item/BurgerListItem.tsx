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
      <li className={classes.root}>
        <div className={classes.image}>
          <figure>
            {burger?.photo?.url ? (
              <Image
                height={500}
                width={500}
                src={burger.photo?.url}
                alt={burger.name}
                loading="lazy"
              />
            ) : (
              <Logo size="lg" />
            )}
          </figure>
        </div>
        <h2 className={classes.name}>{burger.name}</h2>
        <p className={classes.price}>Rs {burger.price * burger.itemsInCart}</p>

        <>
          <AddRemoveButton
            className="u-jc-center"
            leftOnClick={() => {
              dispatch(addBurgerToCart({ burger }));
            }}
            rightOnClick={() => {
              dispatch(removeBurgerFromCart({ burger }));
            }}
          >
            {burger.itemsInCart}
          </AddRemoveButton>
          <IconButton
            aria-label="Remove All"
            onClick={() => {
              dispatch(removeBurgerInstancesFromCart({ burger }));
            }}
            className={classes['burger-list-item__delete-btn']}
          >
            <FiTrash2 size={16} className="u-text-danger" />
          </IconButton>
        </>

        <div className={classes.ingredients}>
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
      </li>
    </>
  );
};

export default BurgerListItem;
