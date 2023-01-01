import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
	FiHome,
	FiLogIn,
	FiUserPlus,
	FiMap,
	FiShoppingCart,
	FiGrid,
	FiLogOut,
} from 'react-icons/fi';
import classes from './navbar.module.scss';
import { useAppSelector } from '../../../store/hooks';
import { HiMenuAlt2 } from 'react-icons/hi';
import Logo from '../../../components/shared/logo';
import Link from 'next/link';
import NavLink from '../nav-link/NavLink';
import NavLinkMobile from '../nav-link/NavLinkMobile';
import clsx from 'clsx';
import useDisclosure from '../../../hooks/use-disclosure';
import { trpc } from '../../../utils/trpc';

const toggleVariants: Variants = {
	hide: {
		opacity: 0,
		visibility: 'hidden',
		pointerEvents: 'none',
		height: 0,
	},
	show: {
		opacity: 1,
		visibility: 'visible',
		pointerEvents: 'all',
		height: 'auto',
		transition: {
			visibilty: {
				delay: 6,
			},
			bounce: 0,
		},
	},
};

const Navbar: React.FC = () => {
	const cartValue = useAppSelector((state) => state.cart.value);
	const context = trpc.useContext();
	const user = context.auth.user.getData();
	const { isOpen, onToggle, onClose } = useDisclosure();

	return (
		<>
			<nav className={classes.root}>
				<Link
					href='/'
					className={clsx([classes.brand, 'u-text-dark'])}
					passHref>
					<Logo size='sm' />
					Burger House
				</Link>
				<>
					<ul className={classes.nav}>
						<NavLink label='home' href='/'>
							{FiHome}
						</NavLink>
						<NavLink label='menu' href='/menu'>
							{FiMap}
						</NavLink>
						{!user && (
							<>
								<NavLink label='login' href='/auth/login'>
									{FiLogIn}
								</NavLink>
								<NavLink label='register' href='/auth/register'>
									{FiUserPlus}
								</NavLink>
							</>
						)}
						{user && (
							<NavLink label='dashboard' href='/dashboard'>
								{FiGrid}
							</NavLink>
						)}
						<NavLink showBadge badgeValue={cartValue} label='cart' href='/cart'>
							{FiShoppingCart}
						</NavLink>
						{user && (
							<NavLink variant='logout' label='Logout' href='/auth/logout'>
								{FiLogOut}
							</NavLink>
						)}
					</ul>

					<HiMenuAlt2
						className={classes.toggle}
						size={20}
						onClick={() => onToggle()}
					/>

					<motion.ul
						variants={toggleVariants}
						initial='hide'
						animate={isOpen ? 'show' : 'hide'}
						className={classes['nav--mobile']}>
						<NavLinkMobile
							icon={FiHome}
							label='Home'
							href='/'
							onClick={() => {
								onClose();
							}}
						/>

						<NavLinkMobile
							icon={FiMap}
							label='Menu'
							href='/menu'
							onClick={() => {
								onClose();
							}}
						/>

						{!user ? (
							<>
								<NavLinkMobile
									icon={FiLogIn}
									label='Login'
									href='/auth/login'
									onClick={() => {
										onClose();
									}}
								/>
								<NavLinkMobile
									icon={FiUserPlus}
									label='Register'
									href='/auth/register'
									onClick={() => {
										onClose();
									}}
								/>
							</>
						) : (
							<NavLinkMobile
								icon={FiUserPlus}
								label='Dashboard'
								href='/dashboard'
								onClick={() => {
									onClose();
								}}
							/>
						)}

						<NavLinkMobile
							icon={FiShoppingCart}
							label='Cart'
							showBadge
							badgeValue={cartValue}
							href='/cart'
							onClick={() => {
								onClose();
							}}
						/>

						{user && (
							<NavLinkMobile
								icon={FiLogOut}
								label='Logout'
								href='/auth/logout'
								variant='logout'
								onClick={() => {
									onClose();
								}}
							/>
						)}
					</motion.ul>
				</>
			</nav>
		</>
	);
};

export default Navbar;
