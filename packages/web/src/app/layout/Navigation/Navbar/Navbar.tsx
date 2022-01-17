import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../components/shared/ui/logo/Logo';
import NavLink from '../NavLink/NavLink';

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

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
	const queryClient = useQueryClient();

	const user = queryClient.getQueryData<User>('user');

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
						<NavLink label='cart' to='/cart'>
							{FiShoppingCart}
						</NavLink>
						{user && (
							<NavLink variant='logout' label='Logout' to='/auth/logout'>
								{FiLogOut}
							</NavLink>
						)}
					</ul>
				</>
			</nav>
		</>
	);
};

export default Navbar;
