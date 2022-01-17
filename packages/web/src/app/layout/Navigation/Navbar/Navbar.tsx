import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../components/shared/ui/logo/Logo';
import NavLink from '../NavLink/NavLink';
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

import './navbar.scss';
import { useQueryClient } from 'react-query';
import { User } from '@burger-house/models';
import NavLinkMobile from '../NavLink/NavLinkMobile';
import { useAppSelector } from '../../../store/hooks';
import { HiMenuAlt2 } from 'react-icons/hi';
import useDisclosure from '../../../hooks/helpers/useDisclosure';

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

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
	const queryClient = useQueryClient();
	const cartValue = useAppSelector((state) => state.cart.value);
	const user = queryClient.getQueryData<User>('user');
	const { isOpen, onToggle, onClose } = useDisclosure();

	return (
		<>
			<nav className='navbar'>
				<Link to='/' className='navbar__brand u-text-dark'>
					<Logo />
					Burger House
				</Link>
				<>
					<ul className='navbar__nav'>
						<NavLink label='home' to='/'>
							{FiHome}
						</NavLink>
						<NavLink label='menu' to='/menu'>
							{FiMap}
						</NavLink>
						{!user && (
							<>
								<NavLink label='login' to='/auth/login'>
									{FiLogIn}
								</NavLink>
								<NavLink label='register' to='/auth/register'>
									{FiUserPlus}
								</NavLink>
							</>
						)}
						{user && (
							<NavLink label='dashboard' to='/dashboard'>
								{FiGrid}
							</NavLink>
						)}
						<NavLink showBadge badgeValue={cartValue} label='cart' to='/cart'>
							{FiShoppingCart}
						</NavLink>
						{user && (
							<NavLink variant='logout' label='Logout' to='/auth/logout'>
								{FiLogOut}
							</NavLink>
						)}
					</ul>

					<HiMenuAlt2
						aria-role='button'
						className='navbar__toggle'
						size={20}
						onClick={() => onToggle()}
					/>

					<motion.ul
						variants={toggleVariants}
						initial='hide'
						animate={isOpen ? 'show' : 'hide'}
						className='navbar__nav--mobile'>
						<NavLinkMobile
							icon={FiHome}
							label='Home'
							to='/'
							onClick={() => {
								onClose();
							}}
						/>

						<NavLinkMobile
							icon={FiMap}
							label='Menu'
							to='/menu'
							onClick={() => {
								onClose();
							}}
						/>

						{!user ? (
							<>
								<NavLinkMobile
									icon={FiLogIn}
									label='Login'
									to='/auth/login'
									onClick={() => {
										onClose();
									}}
								/>
								<NavLinkMobile
									icon={FiUserPlus}
									label='Register'
									to='/auth/register'
									onClick={() => {
										onClose();
									}}
								/>
							</>
						) : (
							<NavLinkMobile
								icon={FiUserPlus}
								label='Dashboard'
								to='/dashboard'
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
							to='/cart'
							onClick={() => {
								onClose();
							}}
						/>

						{user && (
							<NavLinkMobile
								icon={FiLogOut}
								label='Logout'
								to='/auth/logout'
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
