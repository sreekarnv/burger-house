import './order-detail.scss';

import * as React from 'react';

import { AnimatePresence, Variants, motion } from 'framer-motion';

import Backdrop from 'src/app/components/shared/ui/backdrop/Backdrop';
import { Burger } from 'src/@types/burger';
import Button from 'src/app/components/shared/ui/button/Button';
import OrderBurgerItem from 'src/app/components/dashboard/order-detail/OrderBurgerItem/OrderBurgerItem';
import OrderCta from 'src/app/components/dashboard/order-detail/OrderCta/OrderCta';
import OrderStats from 'src/app/components/dashboard/order-detail/OrderStats/OrderStats';
import TrackOrderMap from 'src/app/components/dashboard/order-detail/TrackOrderMap/TrackOrderMap';
import useDisclosure from 'src/app/hooks/useDisclosure';
import { useHistory } from 'react-router-dom';

interface Props {
	order: any;
	isAdmin?: boolean;
}

const variants: Variants = {
	hide: {
		opacity: 0,
		y: -1000,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
			type: 'tween',
		},
	},
	show: {
		opacity: 1,
		y: 30,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
			type: 'tween',
		},
	},
};

const OrderDetail: React.FC<Props> = ({ order, isAdmin }) => {
	const history = useHistory();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<TrackOrderMap
				show={!isAdmin && isOpen}
				closeMap={onClose}
				{...{ order }}
			/>
			<div className='order-detail'>
				<Button
					size='sm'
					className='order-detail__btn'
					onClick={() => history.goBack()}
					variant='outlined'
					color='tertiary'>
					Go Back
				</Button>
				<div className='order-detail__list'>
					{order?.items.map((burger: Burger) => {
						return <OrderBurgerItem key={burger._id} {...{ burger }} />;
					})}
				</div>
				{isAdmin && <OrderStats isAdmin {...{ order }} />}
				{!isAdmin && <OrderStats {...{ order }} />}
				{isAdmin && <OrderCta isAdmin onTrackOrder={onOpen} {...{ order }} />}
				{!isAdmin && <OrderCta onTrackOrder={onOpen} {...{ order }} />}
			</div>
		</>
	);
};

export default OrderDetail;
