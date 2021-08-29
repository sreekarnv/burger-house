import './sidebar.scss';

import * as React from 'react';

import { AnimatePresence, Variants, motion } from 'framer-motion';

import Avatar from 'src/app/components/shared/ui/avatar/Avatar';
import Backdrop from 'src/app/components/shared/ui/backdrop/Backdrop';
import BurgerIcon from 'src/app/components/shared/ui/icons/BurgerIcon';
import Divider from 'src/app/components/shared/ui/divider/Divider';
import IconButton from 'src/app/components/shared/ui/icon-button/IconButton';
import OrderIcon from 'src/app/components/shared/ui/icons/OrderIcon';
import OrdersIcon from 'src/app/components/shared/ui/icons/OrdersIcon';
import SidebarNavItem from '../SidbarNavItem/SidebarNavItem';
import { User } from 'src/@types/user';
import UserRoundIcon from 'src/app/components/shared/ui/icons/UserRoundIcon';
import useDisclosure from 'src/app/hooks/useDisclosure';
import useMediaQuery from 'src/app/hooks/useMediaQuery';
import { useQueryClient } from 'react-query';

// types

// components

// hooks

// styles

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

const variants: Variants = {
	hide: {
		opacity: 0,
		x: -1000,
		transition: {
			duration: 0.5,
			type: 'tween',
			ease: 'easeOut',
		},
	},
	show: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			type: 'tween',
			ease: 'easeOut',
		},
	},
};

const Sidebar: React.FC<Props> = ({ className, ...props }) => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<User>('user')!;
	const { show } = useMediaQuery('(min-width: 50em)');
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Backdrop className='sidebar__backdrop' show={isOpen} onClose={onClose} />
			<IconButton size='lg' onClick={onOpen} className='sidebar__toggler'>
				<BurgerIcon className='u-text-primary' />
			</IconButton>
			<AnimatePresence>
				{(show || isOpen) && (
					<motion.div
						variants={variants}
						initial={show ? false : 'hide'}
						animate={'show'}
						exit={'hide'}
						className={`sidebar u-hide-scrollbar ${
							className ? className : ''
						}`}>
						<div className='sidebar__avatar u-p-5 u-mr-5'>
							<Avatar
								src={process.env.REACT_APP_SERVER_URL! + user?.photoUrl}
								alt={user?.name}
								color='dark'
							/>
							<h5 className='u-text-capitalize u-text-secondary'>
								{user?.name}
							</h5>
						</div>
						<nav className='sidebar__nav'>
							<SidebarNavItem
								onClick={onClose}
								icon={<OrderIcon />}
								to='/dashboard/me/orders'>
								My Orders
							</SidebarNavItem>
							<SidebarNavItem
								onClick={onClose}
								icon={<UserRoundIcon />}
								to='/dashboard/me/profile'>
								My Profile
							</SidebarNavItem>
							{user?.role === 'admin' && (
								<>
									<Divider color='light' />
									<SidebarNavItem
										onClick={onClose}
										icon={<OrdersIcon />}
										to='/dashboard/admin/orders'>
										Manage Orders
									</SidebarNavItem>
								</>
							)}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Sidebar;
