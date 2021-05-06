import './nav-mobile.scss';

import * as React from 'react';

import { AnimatePresence, Variants, motion } from 'framer-motion';

import NavItem from './NavItem';
import { ReduxState } from '~@types/store';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

interface Props {
	showMobileNav: boolean;
	closeNav: () => void;
}

const containerVariants: Variants = {
	show: {
		height: 180,
		transition: {
			delayChildren: 0.3,
			duration: 0.5,
		},
	},
	hide: {
		height: 0,
		transition: {
			duration: 0.5,
		},
	},
};

const navItemsVariants: Variants = {
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.5,
		},
	},
	hide: {
		opacity: 0,
	},
};

const NavMobile: React.FC<Props> = ({ showMobileNav, closeNav }) => {
	const cartItems = useSelector((state: ReduxState) => state.cart.cartValue);
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user');

	return (
		<AnimatePresence>
			{showMobileNav && (
				<motion.div
					variants={containerVariants}
					initial='hide'
					animate={'show'}
					exit='hide'
					className='nav-mobile u-bg-light'>
					<motion.div variants={navItemsVariants}>
						<NavItem
							onClick={() => {
								closeNav();
							}}
							to='/'
							exact>
							Home
						</NavItem>
						<NavItem
							onClick={() => {
								closeNav();
							}}
							to='/menu'>
							Menu
						</NavItem>
						{!user && (
							<>
								<NavItem
									onClick={() => {
										closeNav();
									}}
									to='/auth/login'
									exact>
									Login
								</NavItem>
								<NavItem
									onClick={() => {
										closeNav();
									}}
									to='/auth/register'
									exact>
									Register
								</NavItem>
							</>
						)}
						{user && (
							<NavItem
								onClick={() => {
									closeNav();
								}}
								to='/dashboard'>
								Dashboard
							</NavItem>
						)}
						<NavItem
							onClick={() => {
								closeNav();
							}}
							showBadge
							badgeValue={cartItems}
							to='/cart'
							exact>
							Cart
						</NavItem>
						{user && (
							<NavItem
								onClick={() => {
									closeNav();
								}}
								logout
								to='/auth/logout'
								exact>
								Logout
							</NavItem>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default NavMobile;
